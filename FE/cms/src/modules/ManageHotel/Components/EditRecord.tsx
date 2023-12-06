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
      title="Cập nhật khách sạn"
      okText="Cập nhật khách sạn"
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
          name="Name"
          label="Tên khách sạn"
          rules={[{ required: true, message: "Làm ơn nhập tên khách sạn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
  name="Address"
  label="Địa chỉ khách sạn"
  rules={[{ required: true, message: "Làm ơn nhập địa chỉ khách sạn" }]}
>
  <Input />
</Form.Item>
        <Form.Item
          name="City"
          label="Thành phố"
          rules={[{ required: true, message: "Làm ơn nhập thành phố" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Country"
          label="Quốc gia"
          rules={[{ required: true, message: "Làm ơn nhập quốc gia" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="StarRating"
          label="Số sao"
          rules={[{ required: true, message: "Làm ơn nhập số sao" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Mô tả"
          rules={[{ required: true, message: "Làm ơn nhập mô tả" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Làm ơn nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Website"
          label="Địa chỉ website"
          rules={[{ required: true, message: "Làm ơn nhập địa chỉ website" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Email"
          label="Địa chỉ email"
          rules={[{ required: true, message: "Làm ơn nhập địa chỉ email" }]}
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
        Cập nhật khách sạn
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
