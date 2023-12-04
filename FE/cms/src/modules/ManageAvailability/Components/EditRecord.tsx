import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, FormInstance, Input, Modal } from "antd";
import dayjs from "dayjs";

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
  return (
    <Modal
      open={open}
      title="Cập nhật thông tin tình trạng phòng"
      okText="Cật nhật"
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
        Sửa thông tin phòng
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
