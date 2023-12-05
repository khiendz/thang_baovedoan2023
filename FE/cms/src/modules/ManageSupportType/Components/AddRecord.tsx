import React, { useState } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
} from "antd";
import { useAppContext } from "hook/use-app-context";
import { SupportType } from "Models/SupportType.model";

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
  const { data: supportTypes, setData: setSupportTypes } =
    useAppContext("support-types");

  return (
    <Modal
      open={open}
      title="Tạo kiểu hỗ trợ mới"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as SupportType;
        const result = await save(
          {
            ...row,
          },
          setSupportTypes,
          supportTypes
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
          label="Tên kiểu hỗ trợ"
          rules={[{ required: true, message: "Làm ơn nhập tên kiểu hỗ trợ" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Mô tả kiểu hỗ trợ"
          rules={[{ required: true, message: "Làm ơn nhập mô tả kiểu hỗ trợ" }]}
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
        Thêm kiểu hỗ trợ
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
