import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import "./style.scss";
import { useAppContext } from "hook/use-app-context";
import { getAllHotel, getAllRoomType } from "services";
import MergedColumns from "./Component/MergedColumns";
import Columns from "./Component/Columns";
import { changeRoomType, handleAdd, handleDelete } from "./service";
import AddRecord from "./Component/AddRecord";
import { RoleAccount, RoomType } from "Models";

export default function ManageRoomType() {
  const { data: roomTypes, setData: setRoomTypes } =
    useAppContext("room-types");
  const { data: hotels, setData: setHotels } =
    useAppContext("hotels");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const isEditing = (record: RoleAccount) =>
    record?.RoleId?.toString() === editingKey;

  useEffect(() => {
    setRoomTypes([]);
    setHotels([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
    initData();
    initHotel();
  }, []);

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as RoomType;
      const newData = [...roomTypes];
      const index = newData.findIndex((item) => key == item.RoomTypeId);
      if (index > -1) {
        const item = newData[index];
        const newCollection = { ...item, ...row };
        const result = await changeRoomType(newCollection);
        const updateItem = result.data;
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        newData.splice(index, 1, {
          ...item,
          ...updateItem,
        });
        setRoomTypes(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setRoomTypes(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: RoomType, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.RoomTypeId?.toString() || "");
  };

  const initData = async () => {
    try {
      const result = await getAllRoomType();
      if (result && result?.data) {
        setRoomTypes(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initHotel = async () => {
    try {
      const result = await getAllHotel();
      if (result && result?.data) {
        setHotels(result?.data?.reverse());
      }
    } catch (e) {}
  };


  const columns = Columns(
    setSearchText,
    setSearchedColumn,
    searchInput,
    searchedColumn,
    searchText,
    isEditing,
    edit,
    save,
    cancel,
    form,
    handleDelete,
    setRoomTypes,
    setPopup,
    roomTypes
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return roomTypes ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={roomTypes}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
}
