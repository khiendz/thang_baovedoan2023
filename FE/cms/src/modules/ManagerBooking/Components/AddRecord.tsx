import React, { useState } from "react";
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
  setBookings: any;
  save: any;
  form: FormInstance;
  setPopup: any;
}

interface Props {
  Bookings: Booking[];
  SetBookings: any;
  Save: any;
  Form: FormInstance;
  setPopup: any;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  bookings,
  setBookings,
  save,
  form,
  setPopup
}) => {
  return (
    <Modal
      open={open}
      title="Tạo một ưu đãi mới"
      okText="Tạo ưu đãi"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Promotion;
        const result = await save({
          ...row,
          Discount: parseInt(
            row?.Discount ? row?.Discount?.toString() : "0"
          )
        },setBookings,bookings);
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200
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
          <Input />
        </Form.Item>
        <Form.Item
          name="StartDate"
          label="Ngày bắt đầu"
          rules={[{ required: true, message: "Làm ơn nhập ngày bắt đầu!" }]}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
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
            defaultValue={dayjs(new Date())}
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

const AddRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Bookings, Save, Form, SetBookings, setPopup } = props;

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
        Thêm ưu đãi
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        bookings={Bookings}
        setBookings={SetBookings}
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
