import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import "./style.scss";
import { useAppContext } from "hook/use-app-context";
import { CollectionImage } from "Models/CollectionImage";
import { getAllCollectionImage, getAllTourType } from "services";
import MergedColumns from "./Component/MergedColumns";
import Columns from "./Component/Columns";
import { changeCollection, handleAdd, handleDelete } from "./service";
import AddRecord from "./Component/AddRecord";

export default function ManagerCollectionImages() {
  const { data: collections, setData: setCollection } =
    useAppContext("collection-images");
  const { data: tourTypes, setData: setTourTypes } =
    useAppContext("tour-types");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const isEditing = (record: CollectionImage) =>
    record?.CollectImgId?.toString() === editingKey;

  useEffect(() => {
    setCollection([]);
    setTourTypes([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
    initData();
    initTourTypes();
  }, []);

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as CollectionImage;
      const newData = [...collections];
      const index = newData.findIndex((item) => key == item.CollectImgId);
      if (index > -1) {
        const item = newData[index];
        const newCollection = { ...item, ...row };
        const result = await changeCollection(newCollection);
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
        setCollection(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setCollection(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: CollectionImage, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.CollectImgId?.toString() || "");
  };

  const initData = async () => {
    try {
      const result = await getAllCollectionImage();
      if (result && result?.data) {
        setCollection(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initTourTypes = async () => {
    try {
      const result = await getAllTourType();
      if (result && result?.data) {
        setTourTypes(result?.data?.reverse());
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
    setCollection,
    setPopup,
    collections,
    tourTypes
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return collections ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={collections}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
}
