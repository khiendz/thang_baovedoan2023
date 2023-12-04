import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import { Customer } from "Models";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd } from "./services";
import { useAppContext } from "hook/use-app-context";
import { changeCustomer } from "./services";
import { getAllCustomer } from "services/customer-service";
import { getAllCustomerType } from "services";

const ManageCustomer = () => {
  const { data: customers, setData: setCustomers } =
    useAppContext("customers");
  const { data: customerTypes, setData: setCustomerTypes } = useAppContext("customer-types");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setCustomers([]);
    setCustomerTypes([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: Customer) =>
    record?.CustomerID?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Customer;
      const newData = [...customers];
      const index = newData.findIndex((item) => key === item.CustomerID);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row};
        const result = await changeCustomer(newTourType);
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
        setCustomers(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setCustomers(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Customer, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.CustomerID?.toString() || "");
  };

  useEffect(() => {
    initData();
    initCustomerType();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllCustomer();
      if (result && result?.data) {
        setCustomers(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initCustomerType = async () => {
    try {
      const result = await getAllCustomerType();
      if (result && result?.data) {
        setCustomerTypes(result?.data?.reverse());
      }
    } catch (e) {}
  }

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
    setCustomers,
    setPopup,
    customers,
    customerTypes
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return customers ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={customers}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageCustomer;
