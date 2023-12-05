import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import { Hotel } from "Models";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changeHotel } from "./services";
import { useAppContext } from "hook/use-app-context";
import { getAllHotel } from "services";

const ManageHotel = () => {
  const { data: hotels, setData: setHotels } = useAppContext("hotels");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setHotels([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: Hotel) =>
    record?.HotelId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Hotel;
      const newData = [...hotels];
      const index = newData.findIndex((item) => key === item.HotelId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changeHotel(newTourType);
        if (result && result.data == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setHotels(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setHotels(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Hotel, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.HotelId?.toString() || "");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
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
    setHotels,
    setPopup,
    hotels
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return hotels ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={hotels}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageHotel;
