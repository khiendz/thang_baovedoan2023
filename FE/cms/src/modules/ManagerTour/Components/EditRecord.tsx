import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";
import { Promotion, Tour, TourType } from "Models";
import UploadFileImage from "components/UploadFileImage";

interface CollectionEditFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  tours: Tour[],
  save: any;
  form: FormInstance;
}

interface Props {
  Tours: Tour[];
  onInit: any;
  Cancel: any;
  Save: any;
  Form: FormInstance;
}

const { TextArea } = Input;

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
      title="Tạo một loại tour mới"
      okText="Cập nhật tour"
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
          name="Name"
          label="Tên tour"
          rules={[{ required: true, message: "Làm ơn nhập tên tour" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Description" label="Mô tả tour">
          <TextArea/>
        </Form.Item>
        <Form.Item
          name="PriceElder"
          label="Giá người lớn"
          rules={[{ required: true, message: "Làm ơn nhập giá người lớn" }]}
        >
          <Input type="number"/>
        </Form.Item>
        <Form.Item
          name="PriceChildren"
          label="Giá trẻ em"
          rules={[{ required: true, message: "Làm ơn nhập giá trẻ em" }]}
        >
          <Input type="number"/>
        </Form.Item>
        <Form.Item name="Img" label="Ảnh đại diện" className="dk-w-full dk-flex dk-justify-center" >
          <UploadFileImage lengthMaxImage={1} form={form} keyField="Img"/>
        </Form.Item>
        <Form.Item name="IsLocal" label="Địa lý" className="dk-w-full">
        <Select
            className="dk-w-full"
            options={[
              { value: 0, label: "Trong nước" },
              { value: 1, label: "Ngoài nước" },
            ]}
            onChange={(value) => {
              form.setFieldValue("Description", value);
            }}
          />
        </Form.Item>
        <Form.Item 
          name="RateTourType" 
          label="Đánh giá" 
          className="dk-w-full"
        >
          <Input type="number" max={10} min={0}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Tours, Save, Form, onInit, Cancel } = props;

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
        Sửa tour
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        tours={Tours}
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
