import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import { Promotion, Tour, TourType } from "Models";
import { getAllTour, getAllTourType } from "services";
import "./style.scss";
import { getAllPromotion } from "services/promotion-services";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergedColumns";
import { changeTour, handleDelete, handleAdd } from "./Services";
import NotifYPopup from "components/NotifyPopup";
import tour from "pages/khach-san";

const ManagerTour = () => {
  const [tours, setTour] = useState<Tour[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [popup,setPopup] = useState({
    title: "",
    messagePopup: "",
    state: true
  });
  const [titlePopup,setTitlePopup] = useState("Thành công");
  const [statePopup,setStatePopup] = useState(true);
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
          state: result?.status == 200
        })
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
  }, []);

  const initData = async () => {
    try {
      const result = await getAllTour();
      if (result && result?.data) {
        setTour(result?.data?.reverse());
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
  const mergedColumns = MergedColumns(
    columns,
    isEditing,
    tours,
    form
  );

  return tours ? (
    <>
      <Form form={form} component={false}>
        <AddRecord
          Save={handleAdd}
          Form={form}
          Tours={tours}
          setTour={setTour}
          setPopup={setPopup}
          setTitlePopup={setTitlePopup}
          setStatePopup={setStatePopup}
        />
        <Table
          columns={mergedColumns}
          dataSource={tours}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
      <NotifYPopup  messagePopup={popup.messagePopup || ""} setPopup={setPopup} state={popup.state} title={popup.title}/>
    </>
  ) : null;
};

export default ManagerTour;
