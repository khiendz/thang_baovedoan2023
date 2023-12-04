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
  const { data: customers, setData: setCustomers } =
    useAppContext("customers");
  const { data: customerTypes } =
    useAppContext("customer-types");

  useEffect(() => {
    form.setFieldValue("CustomerTypeId",1);
  }, []);

  return (
    <Modal
      open={open}
      title="Tạo thành viên mới"
      okText="Tạo thành viên"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Customer;
        const result = await save(
          {
            ...row,
          },
          setCustomers,
          customers
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
          name="Email"
          label="Email"
          rules={[
            { required: true, message: "Làm ơn nhập email" },
            {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email không hợp lệ',
              },
        ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Làm ơn nhập số điện thoại" },
            { 
                pattern: /^(?:\+?84|0)(?:\d{9,10})$/,
                message: 'Số điện thoại không hợp lệ',
            }
        ]}
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
        <Form.Item name="CustomerTypeId" label="Ưu đãi" className="dk-w-full">
          <Select
            className="dk-w-full"
            defaultValue={
              { value: "1", label: "Khách đặt tour"}
            }
            options={[
              ...customerTypes?.map((ob: CustomerType) => {
                return { value: ob.CustomerTypeId, label: ob.Name, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("CustomerTypeId", value);
            }}
          />
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
        Thêm thành viên
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        setPopup={setPopup}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddRecord;
