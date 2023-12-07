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
import { Booking, Payment } from "Models";
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
  const { data: payments, setData: setPayments } =
    useAppContext("payments");
  const { data: bookings } =
    useAppContext("bookings");

  return (
    <Modal
      open={open}
      title="Tạo thông tin thanh toán cho khách hàng"
      okText="Tạo payment"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Payment;
        const result = await save(
          {
            ...row,
            BookingID: parseInt(row.BookingID.toString()),
            Amount: parseInt(row.Amount.toString())
          },
          setPayments,
          payments
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
          name="BookingID"
          label="Đơn booking"
          rules={[{ required: true, message: "Làm ơn chọn đơn booking" }]}
        >
          <Select
            className="dk-w-full"
            options={[
              ...bookings?.map((ob: Booking) => {
                return { value: ob.CustomerID, label: `${ob?.Customer?.FirstName + " " + ob?.Customer?.LastName}`, ob: ob };
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
            valuePropName={'date'}
        >
             <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("PaymentDate", dayjs(value));
            }}
          />
        </Form.Item>
        <Form.Item
          name="Amount"
          label="Tổng tiền thanh toán"
          rules={[
            { required: true, message: "Làm ơn tổng tiền thanh toán" }
          ]}
        >
          <Input type="number"/>
        </Form.Item>
        <Form.Item
          name="OrderCode"
          label="Mã thanh toán"
          rules={[
            { required: true, message: "Làm ơn nhập mã thanh toán" }
          ]}
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
        Thêm payment
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
