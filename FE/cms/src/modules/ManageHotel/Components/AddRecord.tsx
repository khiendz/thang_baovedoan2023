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
import { CustomerSupport, Hotel } from "Models";
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
  const { data: hotels, setData: setHotels } = useAppContext("hotels");

  return (
    <Modal
      open={open}
      title="Tạo thông tin khách sạn"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Hotel;
        const result = await save(
          {
            ...row,
          },
          setHotels,
          hotels
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
          label="Tên khách sạn"
          rules={[{ required: true, message: "Làm ơn nhập tên khách sạn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Địa chỉ khách sạn"
          label="SupportTypeId"
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
        Thêm khách sạn
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
