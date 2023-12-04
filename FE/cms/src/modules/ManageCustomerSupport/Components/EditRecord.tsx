import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
} from "antd";
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
      title="Tạo thành viên mới"
      okText="Tạo thành viên"
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

const EditRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Save, Form, onInit, Cancel } = props;

  useEffect(() => {
    if (open)
    onInit();
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
        Sửa hỗ trợ người dùng
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
