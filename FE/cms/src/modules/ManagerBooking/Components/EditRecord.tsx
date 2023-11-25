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
import dayjs from "dayjs";
import { Booking, Promotion, TourType } from "Models";

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  bookings: Booking[];
  save: any;
  form: FormInstance;
}

interface Props {
  Bookings: Booking[];
  onInit: any;
  Cancel: any;
  Save: any;
  Form: FormInstance;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  bookings,
  save,
  form,
}) => {
  
  form?.setFieldValue("StartDate", form?.getFieldValue("StartDate") ? dayjs(form?.getFieldValue("StartDate")) : dayjs(new Date()));
  form?.setFieldValue("EndDate", form?.getFieldValue("EndDate") ? dayjs(form?.getFieldValue("EndDate")) : dayjs(new Date()));
  
  return (
    <Modal
      open={open}
      title="Cập nhật ưu đãi"
      okText="Cập nhật ưu đãi"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
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
          label="Tên ưu đãi"
          rules={[{ required: true, message: "Làm ơn nhập tên ưu đãi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Description" label="Mô tả ưu đãi">
          <Input />
        </Form.Item>
        <Form.Item
          name="PromoCode"
          label="Mã ưu đãi"
          rules={[{ required: true, message: "Làm ơn nhập mã ưu đãi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Discount"
          label="Tỷ lệ ưu đãi"
          rules={[{ required: true, message: "Làm ơn nhập tỷ lệ ưu đãi" }]}
        >
          <Input type="number"/>
        </Form.Item>
        <Form.Item
          name="StartDate"
          label="Ngày bắt đầu"
          rules={[{ required: true, message: "Làm ơn nhập ngày bắt đầu!" }]}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("StartDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="EndDate"
          label="Ngày kết thúc"
          rules={[{ required: true, message: "Làm ơn nhập ngày kết thúc!" }]}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("EndDate", value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Bookings, Save, Form, onInit, Cancel } = props;

  useEffect(() => {
    if (open) {
      onInit();
    }
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
        Sửa ưu đãi
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        bookings={Bookings}
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