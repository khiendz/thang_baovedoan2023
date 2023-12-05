import React, { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";
import { CustomerSupport } from "Models";
import { useAppContext } from "hook/use-app-context";
import dayjs from "dayjs";
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
  const { data: customerTypes, setData: setCustomerTypes } =
    useAppContext("customer-types");

  return (
    <Modal
      open={open}
      title="Tạo kiểu khách hàng"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as CustomerType;
        const result = await save(
          {
            ...row,
          },
          setCustomerTypes,
          customerTypes
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
          name="Name"
          label="Tên kiểu khách hàng"
          rules={[
            { required: true, message: "Làm ơn nhập tên kiểu khách hàng" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Mô tả kiểu khách hàng"
          rules={[
            { required: true, message: "Làm ơn nhập mô tả kiểu khách hàng" },
          ]}
        >
          <Input type="number" />
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
        Thêm kiểu khách hàng
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
