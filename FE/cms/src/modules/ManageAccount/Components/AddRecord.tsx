import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";
import { Customer } from "Models";
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
  const { data: accounts, setData: setAccounts } =
    useAppContext("accounts");

  return (
    <Modal
      open={open}
      title="Tạo tài khoản mới"
      okText="Tạo tài khoản"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Customer;
        const result = await save(
          {
            ...row,
          },
          setAccounts,
          accounts
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
        Thêm tài khoản
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
