import React, { useState } from "react";
import { Button, Form, FormInstance, Input, Modal } from "antd";
import { useAppContext } from "hook/use-app-context";
import { User } from "Models";

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
  const { data: users, setData: setUsers } = useAppContext("users");

  return (
    <Modal
      open={open}
      title="Tạo người dùng mới"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as User;
        const result = await save(
          {
            ...row,
          },
          setUsers,
          users
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
          name="FirstName"
          label="Họ"
          rules={[{ required: true, message: "Làm ơn nhập họ" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="LastName"
          label="Tên"
          rules={[{ required: true, message: "Làm ơn nhập tên" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Làm ơn nhập địa chỉ" }]}
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
          name="AccountId"
          label="Tài khoản"
          rules={[{ required: true, message: "Làm ơn chọn tài khoản" }]}
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
        Thêm người dùng
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
