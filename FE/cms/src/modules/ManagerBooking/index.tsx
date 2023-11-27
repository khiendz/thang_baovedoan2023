import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import { Booking } from "Models";
import { getAllBooking } from "services";
import "./style.scss";
import Columns from "./Components/Column";
import MergedColumns from "./Components/MergedColumns";
import { changeBooking, handleAdd, handleDelete } from "./Services";
import NotifYPopup from "components/NotifyPopup";
import { useAppContext } from "hook/use-app-context";

const ManagerBooking = () => {
  const { setData: setPopup } = useAppContext("popup-message");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: Booking) =>
    record?.BookingID?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Booking;
      const newData = [...bookings];
      const index = newData.findIndex((item) => key === item.BookingID);
      if (index > -1) {
        const item = newData[index];
        const newTourType = {
          ...item,
          ...row,
        };
        const result = await changeBooking(newTourType);
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setBookings(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setBookings(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Booking, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.BookingID?.toString() || "");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllBooking();
      if (result && result?.data) {
        setBookings(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const columns = Columns(
    setSearchText,
    setSearchedColumn,
    searchInput,
    searchedColumn,
    searchText,
    bookings,
    setBookings,
    isEditing,
    edit,
    save,
    cancel,
    form,
    handleDelete,
    setPopup
  );

  const mergedColumns = MergedColumns(columns, bookings, isEditing, form);

  return bookings ? (
    <>
      <Form form={form} component={false}>
        <AddRecord
          Save={handleAdd}
          Form={form}
          Bookings={bookings}
          SetBookings={setBookings}
          setPopup={setPopup}
        />
        <Table
          columns={mergedColumns}
          dataSource={bookings}
          rowClassName="editable-row"
          scroll={{ x: 1500, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManagerBooking;
