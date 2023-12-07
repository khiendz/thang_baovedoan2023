import React, { useEffect, useState } from "react";
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
import { useAppContext } from "hook/use-app-context";
import { Booking } from "Models";

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
  const { data: bookings } = useAppContext("bookings");
  return (
    <Modal
      open={open}
      title="Cập nhật thông tin thanh toán"
      okText="Cập nhật"
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
          name="BookingID"
          label="Đơn booking"
          rules={[{ required: true, message: "Làm ơn chọn đơn booking" }]}
        >
          <Select
            className="dk-w-full"
            options={[
              ...bookings?.map((ob: Booking) => {
                return {
                  value: ob.CustomerID,
                  label: `${
                    ob?.Customer?.FirstName + " " + ob?.Customer?.LastName
                  }`,
                  ob: ob,
                };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("CustomerID", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="PaymentDate"
          label="Ngày thanh toán"
          rules={[{ required: true, message: "Làm ơn ngày thanh toán" }]}
          valuePropName={"date"}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("PaymentDate", dayjs(value));
            }}
          />
        </Form.Item>
        <Form.Item
          name="Amount"
          label="Tổng tiền thanh toán"
          rules={[{ required: true, message: "Làm ơn tổng tiền thanh toán" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="OrderCode"
          label="Mã thanh toán"
          rules={[{ required: true, message: "Làm ơn nhập mã thanh toán" }]}
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
        Sửa payment
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
