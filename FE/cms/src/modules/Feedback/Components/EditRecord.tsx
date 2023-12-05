import React, { useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Modal } from "antd";

interface CollectionEditFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  save: any;
  form: FormInstance;
}

interface Props {
  onInit: any;
  Cancel: any;
  Save: any;
  Form: FormInstance;
}

const CollectionCreateForm: React.FC<CollectionEditFormProps> = ({
  open,
  onCreate,
  onCancel,
  save,
  form,
}) => {
  return (
    <Modal
      open={open}
      title="Cập nhật phản hồi"
      okText="Cập nhật"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        save();
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
          rules={[{ required: true, message: "Làm ơn nhập đánh giá" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Comment"
          label="Nội dung phản hồi"
          rules={[{ required: true, message: "Làm ơn nhập nội dung phản hồi" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Save, Form, onInit, Cancel } = props;

  useEffect(() => {
    if (open) onInit();
  }, [open]);

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
        Sửa phản hồi
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
          Cancel();
          Form.resetFields();
        }}
      />
    </div>
  );
};

export default EditRecord;
