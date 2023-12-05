import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import { CustomerSupport } from "Models";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changeCustomerSupport } from "./services";
import { useAppContext } from "hook/use-app-context";
import { getAllCustomerSupport } from "services";

const ManageCustomerSupport = () => {
  const { data: customerSupports, setData: setCustomerSupports } =
    useAppContext("customer-supports");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setCustomerSupports([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: CustomerSupport) =>
    record?.CustomerID?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as CustomerSupport;
      const newData = [...customerSupports];
      const index = newData.findIndex((item) => key === item.SupportID);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row};
        const result = await changeCustomerSupport(newTourType);
        if (result && result.status == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setCustomerSupports(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setCustomerSupports(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: CustomerSupport, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.SupportID?.toString() || "");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllCustomerSupport();
      if (result && result?.data) {
        setCustomerSupports(result?.data?.reverse());
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
    setCustomerSupports,
    setPopup,
    customerSupports,
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return customerSupports ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={customerSupports}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageCustomerSupport;
