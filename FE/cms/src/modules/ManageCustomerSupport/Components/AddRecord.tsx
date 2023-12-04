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
  const { data: customerSupports, setData: setCustomerSupports } =
    useAppContext("customer-supports");

  return (
    <Modal
      open={open}
      title="Tạo hỗ trợ"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as CustomerSupport;
        const result = await save(
          {
            ...row,
          },
          setCustomerSupports,
          customerSupports
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
          label="CustomerID"
          rules={[{ required: true, message: "Làm ơn nhập CustomerID" }]}
        >
          <Input type="number"/>
        </Form.Item>
        <Form.Item 
            name="SupportTypeId" 
            label="SupportTypeId"
            rules={[{ required: true, message: "Làm ơn nhập SupportTypeId" }]}
        >
            <Input type="number"/>
        </Form.Item>
        <Form.Item
          name="SupportDate"
          label="SupportDate"
          rules={[
            { required: true, message: "Làm ơn nhập SupportDate" }
          ]}
          valuePropName={"date"}
        >
           <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("SupportDate", dayjs(value));
            }}
          />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Mô tả"
          rules={[{ required: true, message: "Làm ơn nhập mô tả" }]}
        >
          <Input/>
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
        Thêm hỗ trợ
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
