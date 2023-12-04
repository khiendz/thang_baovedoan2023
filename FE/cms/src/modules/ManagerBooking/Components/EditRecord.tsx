import React, { useState, useEffect } from "react";
import { Button, DatePicker, Form, FormInstance, Modal, Select } from "antd";
import dayjs from "dayjs";
import { Booking, Customer, Tour } from "Models";
import { useAppContext } from "hook/use-app-context";

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
  save,
  form,
}) => {
  const { data: customers } = useAppContext("customers");
  const { data: tours } = useAppContext("tours");

  form?.setFieldValue(
    "BookingDate",
    form?.getFieldValue("BookingDate")
      ? dayjs(form?.getFieldValue("BookingDate"))
      : dayjs(new Date())
  );

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
          name="CustomerID"
          label="Khách hàng"
          rules={[{ required: true, message: "Làm ơn chọn khách hàng" }]}
        >
          <Select
            className="dk-w-full"
            options={[
              ...customers?.map((ob: Customer) => {
                return {
                  value: ob.CustomerID,
                  label: `${ob.FirstName + " " + ob.LastName}`,
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
        Sửa booking
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
