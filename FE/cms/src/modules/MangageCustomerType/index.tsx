import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changeCustomerType } from "./services";
import { useAppContext } from "hook/use-app-context";
import { getAllCustomerType } from "services";
import { CustomerType } from "Models/CustomerType.model";

const ManageCustomerType = () => {
  const { data: customerTypes, setData: setCustomerTypes } =
    useAppContext("customer-types");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setCustomerTypes([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: CustomerType) =>
    record?.CustomerTypeId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as CustomerType;
      const newData = [...customerTypes];
      const index = newData.findIndex((item) => key === item.CustomerTypeId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changeCustomerType(newTourType);
        if (result && result.data == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setCustomerTypes(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setCustomerTypes(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: CustomerType, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.CustomerTypeId?.toString() || "");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllCustomerType();
      if (result && result?.data) {
        setCustomerTypes(result?.data?.reverse());
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
    setCustomerTypes,
    setPopup,
    customerTypes
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return customerTypes ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={customerTypes}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageCustomerType;
