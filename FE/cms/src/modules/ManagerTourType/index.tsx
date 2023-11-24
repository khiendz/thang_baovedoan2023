import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Component/AddRecord";
import { Promotion, TourType } from "Models";
import { getAllTourType } from "services";
import "./style.scss";
import { getAllPromotion } from "services/promotion-services";
import Columns from "./Component/Columns";
import MergedColumns from "./Component/MergedColumns";
import { changeTourType, handleDelete, handleAdd } from "./Services";
import NotifYPopup from "components/NotifyPopup";

const ManagerTourType = () => {
  const [tourTypes, setTourTypes] = useState<TourType[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [messagePopup,setMessagePopup] = useState("");
  const [titlePopup,setTitlePopup] = useState("Thành công");
  const [statePopup,setStatePopup] = useState(true);
  const isEditing = (record: TourType) =>
    record?.TourTypeId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TourType;
      const newData = [...tourTypes];
      const index = newData.findIndex((item) => key === item.TourTypeId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = changeTourType(newTourType);
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setTourTypes(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setTourTypes(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: TourType, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.TourTypeId?.toString() || "");
  };

  useEffect(() => {
    initData();
    initPromotion();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllTourType();
      if (result && result?.data) {
        setTourTypes(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initPromotion = async () => {
    try {
      const result = await getAllPromotion();
      if (result && result?.data) {
        setPromotions(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const columns = Columns(
    setSearchText,
    setSearchedColumn,
    searchInput,
    searchedColumn,
    searchText,
    promotions,
    tourTypes,
    isEditing,
    edit,
    save,
    cancel,
    form,
    handleDelete,
    setTourTypes
  );
  const mergedColumns = MergedColumns(
    columns,
    isEditing,
    tourTypes,
    promotions,
    form
  );

  return tourTypes ? (
    <>
      <Form form={form} component={false}>
        <AddRecord
          Save={handleAdd}
          Form={form}
          TourTypes={tourTypes}
          Promotions={promotions}
          setTourTypes={setTourTypes}
          setMessagePopup={setMessagePopup}
          setTitlePopup={setTitlePopup}
          setStatePopup={setStatePopup}
        />
        <Table
          columns={mergedColumns}
          dataSource={tourTypes}
          rowClassName="editable-row"
          bordered
        ></Table>
      </Form>
      <NotifYPopup  messagePopup={messagePopup || ""} setMessagePopup={setMessagePopup} state={statePopup} title={titlePopup}/>
    </>
  ) : null;
};

export default ManagerTourType;
