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
import { useAppContext } from "hook/use-app-context";
import { userService } from "services";

const ManagerTourType = () => {
  const { setData: setPopup } = useAppContext("popup-message");
  const [tourTypes, setTourTypes] = useState<TourType[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [titlePopup, setTitlePopup] = useState("Thành công");
  const [statePopup, setStatePopup] = useState(true);

  useEffect(() => {
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
      const row = (await form.validateFields()) as TourType;
      const newData = [...tourTypes];
      const index = newData.findIndex((item) => key === item.TourTypeId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changeTourType(newTourType);
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
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
    setTourTypes,
    setPopup
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
          setPopup={setPopup}
          setTitlePopup={setTitlePopup}
          setStatePopup={setStatePopup}
        />
        <Table
          columns={mergedColumns}
          dataSource={tourTypes}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManagerTourType;
