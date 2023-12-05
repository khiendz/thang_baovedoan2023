import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changeSupportType } from "./services";
import { useAppContext } from "hook/use-app-context";
import { getAllSupportType } from "services";
import { SupportType } from "Models/SupportType.model";

const ManageSupportType = () => {
  const { data: supportTypes, setData: setSupportTypes } =
    useAppContext("support-types");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setSupportTypes([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: SupportType) =>
    record?.SupportTypeId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as SupportType;
      const newData = [...supportTypes];
      const index = newData.findIndex((item) => key === item.SupportTypeId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changeSupportType(newTourType);
        if (result && result.status == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setSupportTypes(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setSupportTypes(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: SupportType, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.SupportTypeId?.toString() || "");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllSupportType();
      if (result && result?.data) {
        setSupportTypes(result?.data?.reverse());
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
    setSupportTypes,
    setPopup,
    supportTypes
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return supportTypes ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={supportTypes}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageSupportType;
