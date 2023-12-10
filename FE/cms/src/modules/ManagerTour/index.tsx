import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import { Tour, TourType } from "Models";
import { getAllRoomType, getAllTour, getAllTourType } from "services";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergedColumns";
import { changeTour, handleDelete, handleAdd } from "./Services";
import { useAppContext } from "hook/use-app-context";

const ManagerTour = () => {
  const { setData: setPopup } = useAppContext("popup-message");
  const { data: tourTypes, setData: setTourTypes } = useAppContext("tour-types");
  const { data: roomTypes, setData: setRoomTypes } = useAppContext("room-types");
  const [tours, setTour] = useState<Tour[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setTourTypes([]);
    setRoomTypes([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: TourType) =>
    record?.TourTypeId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Tour;
      const newData = [...tours];
      const index = newData.findIndex((item) => key === item.TourID);
      if (index > -1) {
        const item = newData[index];
        const newTour = { ...item, ...row };
        const result = await changeTour(newTour);
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setTour(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setTour(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Tour, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.TourID?.toString() || "");
  };

  useEffect(() => {
    initData();
    initTourType();
    initRoomType();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllTour();
      if (result && result?.data) {
        setTour(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initTourType = async () => {
    try {
      const result = await getAllTourType();
      if (result && result?.data) {
        setTourTypes(result?.data);
      }
    } catch (e) {}
  };

  const initRoomType = async () => {
    try {
      const result = await getAllRoomType();
      if (result && result?.data) {
        setRoomTypes(result?.data);
      }
    } catch (e) {}
  };

  const columns = Columns(
    setSearchText,
    setSearchedColumn,
    searchInput,
    searchedColumn,
    searchText,
    tours,
    isEditing,
    edit,
    save,
    cancel,
    form,
    handleDelete,
    setTour,
    setPopup
  );
  const mergedColumns = MergedColumns(columns, isEditing, tours, form);

  return tours ? (
    <>
      <Form form={form} component={false}>
        <AddRecord
          Save={handleAdd}
          Form={form}
          Tours={tours}
          setTour={setTour}
          setPopup={setPopup}
        />
        <Table
          columns={mergedColumns}
          dataSource={tours}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManagerTour;
