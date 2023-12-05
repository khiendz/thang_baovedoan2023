import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";
import { Customer, Feedback } from "Models";
import { useAppContext } from "hook/use-app-context";
import { CustomerType } from "Models/CustomerType.model";
interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  save: any;
  form: FormInstance;
  setPopup: any;
}

interface Props {
  Save: any;
  Form: FormInstance;
  setPopup: any;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  save,
  form,
  setPopup,
}) => {
  const { data: feedbacks, setData: setFeedbacks } =
    useAppContext("feedbacks");

  return (
    <Modal
      open={open}
      title="Tạo phản hồi mới"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Feedback;
        const result = await save(
          {
            ...row,
          },
          setFeedbacks,
          feedbacks
        );
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        onCreate();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="CustomerID"
          label="Khách hàng"
          rules={[{ required: true, message: "Làm ơn chọn khách hàng" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
            name="TourID" 
            label="Tour"
            rules={[{ required: true, message: "Làm ơn chọn tour" }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
          name="Rating"
          label="Đánh giá"
          rules={[
            { required: true, message: "Làm ơn nhập đánh giá" },
        ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Comment"
          label="Nội dung phản hồi"
          rules={[
            { required: true, message: "Làm ơn nhập nội dung phản hồi" },
        ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Save, Form, setPopup } = props;

  const onCreate = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Thêm phản hồi
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        setPopup={setPopup}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
         Form.resetFields();
        }}
      />
    </div>
  );
};

export default AddRecord;
