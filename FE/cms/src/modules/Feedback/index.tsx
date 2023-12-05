import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import { Feedback } from "Models";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changeFeedback } from "./services";
import { useAppContext } from "hook/use-app-context";
import { getAllFeedback } from "services";

const ManageFeedback = () => {
  const { data: feedbacks, setData: setFeedbacks } = useAppContext("feedbacks");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setFeedbacks([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: Feedback) =>
    record?.FeedbackID?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Feedback;
      const newData = [...feedbacks];
      const index = newData.findIndex((item) => key === item.CustomerID);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changeFeedback(newTourType);
        if (result && result.status == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setFeedbacks(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setFeedbacks(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Feedback, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.FeedbackID?.toString() || "");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllFeedback();
      if (result && result?.data) {
        setFeedbacks(result?.data?.reverse());
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
    setFeedbacks,
    setPopup,
    feedbacks
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return feedbacks ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={feedbacks}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageFeedback;
