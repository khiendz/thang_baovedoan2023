import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Modal,
  Select,
} from "antd";
import dayjs from "dayjs";
import { Booking, Customer, Tour } from "Models";
import { useAppContext } from "hook/use-app-context";

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
  setPopup
}) => {
  const { data: bookings, setData: setBookings } = useAppContext("booking");
  const { data: customers } = useAppContext("customers");
  const { data: tours } = useAppContext("tours");
  return (
    <Modal
      open={open}
      title="Tạo một booking"
      okText="Tạo booking"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Booking;
        const result = await save({
          ...row
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
          name="CustomerID"
          label="Khách hàng"
          rules={[{ required: true, message: "Làm ơn chọn khách hàng" }]}
        >
           <Select
            className="dk-w-full"
            options={[
              ...customers?.map((ob: Customer) => {
                return { value: ob.CustomerID, label: `${ob.FirstName + " " + ob.LastName}`, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("CustomerID", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="TourID"
          label=""
          rules={[{ required: true, message: "Làm ơn chọn tour" }]}
        >
           <Select
            className="dk-w-full"
            options={[
              ...tours?.map((ob: Tour) => {
                return { value: ob.TourID, label: ob.TourName, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("TourID", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="BookingDate"
          label="Ngày booking"
          rules={[{ required: true, message: "Làm ơn nhập ngày booking!" }]}
          valuePropName={'date'}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("BookingDate", value);
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
        Thêm booking
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
