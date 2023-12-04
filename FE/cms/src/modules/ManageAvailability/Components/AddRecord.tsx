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
import { Availability, Customer } from "Models";
import { useAppContext } from "hook/use-app-context";
import { CustomerType } from "Models/CustomerType.model";
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
  const { data: availabilities, setData: setAvailabilities } =
    useAppContext("availabilities");

  return (
    <Modal
      open={open}
      title="Tạo trạng thái phòng"
      okText="Tạo trạng thái phòng"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Availability;
        const result = await save(
          {
            ...row,
          },
          setAvailabilities,
          availabilities
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
          name="Ngày kiểm tra"
          label="DateCheck"
          rules={[{ required: true, message: "Làm ơn nhập ngày kiểm tra" }]}
          valuePropName={"date"}
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
          name="Số người còn có thể ở"
          label="AvailableRooms"
          rules={[
            { required: true, message: "Làm ơn nhập số người còn có thể ở" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="Kiểu phòng"
          label="RoomTypeId"
          rules={[{ required: true, message: "Làm ơn nhập kiểu phòng" }]}
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
        Thêm tài khoản
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
