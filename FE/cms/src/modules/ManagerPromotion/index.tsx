import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  InputRef,
  Table,
} from "antd";
import AddRecord from "./Component/AddRecord";
import { Promotion, TourType } from "Models";
import { getAllTourType } from "services";
import "./style.scss";
import { getAllPromotion } from "services/promotion-services";
import Columns from "./Component/Column";
import MergedColumns from "./Component/MergedColumns";
import { changePromotion, handleAdd, handleDelete } from "./Services";

const ManagerPromotion = () => {
  const [tourTypes, setTourTypes] = useState<TourType[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const isEditing = (record: Promotion) => record?.PromotionID?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Promotion;
      const newData = [...promotions];
      const index = newData.findIndex((item) => key === item.PromotionID);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { 
          ...item, 
          ...row, 
          Discount: parseInt(
            row?.Discount ? row?.Discount?.toString() : "0"
          )
        };
        const result = changePromotion(newTourType);
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        setPromotions(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setPromotions(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Promotion, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.PromotionID?.toString() || "");
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

  const columns = Columns(setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText,promotions,tourTypes,setPromotions,isEditing,edit,save,cancel,form,handleDelete);
  const mergedColumns = MergedColumns(columns,tourTypes,promotions,isEditing,form);

  return promotions ? (
    <Form form={form} component={false}>
      <AddRecord
        Save={handleAdd}
        Form={form}
        TourTypes={tourTypes}
        Promotions={promotions}
        SetPromotion={setPromotions}
      />
      <Table
        columns={mergedColumns}
        dataSource={promotions}
        rowClassName="editable-row"
        scroll={{ x: 1500, y: 700 }}
        bordered
      ></Table>
    </Form>
  ) : null;
};

export default ManagerPromotion;
