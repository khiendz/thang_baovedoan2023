import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
} from "antd";

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
      title="Cập nhật thông tin tài khoản"
      okText="Cật nhật tài khoản"
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
          name="UserName"
          label="UserName"
          rules={[{ required: true, message: "Làm ơn nhập UserName" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
            name="Password" 
            label="Password"
            rules={[{ required: true, message: "Làm ơn nhập password" }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
          name="RoleId"
          label="RoleId"
          rules={[
            { required: true, message: "Làm ơn nhập role id" }
        ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="UserId"
          label="User Id"
          rules={[
            { required: true, message: "Làm ơn nhập user id" }
        ]}
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
    if (open)
    onInit();
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
        Sửa tài khoản
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
