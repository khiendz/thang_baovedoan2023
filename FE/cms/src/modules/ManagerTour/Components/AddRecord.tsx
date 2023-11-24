import React, { useState } from "react";
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
interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  tours: Tour[],
  save: any;
  form: FormInstance;
  setTour: any;
  setPopup: any;
  setTitlePopup: any;
  setStatePopup: any;
}

interface Props {
  Tours: Tour[];
  Save: any;
  Form: FormInstance;
  setTour: any;
  setPopup: any;
  setTitlePopup: any;
  setStatePopup: any;
}

const { TextArea } = Input;

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  save,
  form,
  setTour,
  setPopup,
  tours
}) => {
  return (
    <Modal
      open={open}
      title="Tạo một loại tour mới"
      okText="Tạo loại tour"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Tour;
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
          <Input />
        </Form.Item>
        <Form.Item
          name="PriceChildren"
          label="Giá trẻ em"
          rules={[{ required: true, message: "Làm ơn nhập giá trẻ em" }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="Location"
          label="Vị trí"
          rules={[{ required: true, message: "Làm ơn nhập vị trí!" }]}
        >
            <Input />
        </Form.Item>
        <Form.Item name="Img" label="Ảnh đại diện" className="dk-w-full dk-flex dk-justify-center" >
          <UploadFileImage lengthMaxImage={1} form={form} keyField="Img"/>
        </Form.Item>
        <Form.Item name="IsLocal" label="Địa lý" className="dk-w-full" rules={[{ required: true, message: "Làm ơn chọn địa lý" }]}>
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
        <Form.Item name="RateTourType" label="Đánh giá" className="dk-w-full">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Tours, Save, Form, setTour, setPopup, setTitlePopup, setStatePopup } = props;

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
        Thêm loại tour
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        tours={Tours}
        setTour={setTour}
        setPopup={setPopup}
        setTitlePopup={setTitlePopup}
        setStatePopup={setStatePopup}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddRecord;
