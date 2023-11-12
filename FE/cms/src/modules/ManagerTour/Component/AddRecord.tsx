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
import dayjs from "dayjs";
import { TourType } from "Models";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  tourTypes: TourType[],
  save: any;
  form: FormInstance;
}

interface Props {
  TourTypes: TourType[];
  Save: any;
  Form: FormInstance;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  tourTypes,
  save,
  form,
}) => {
  return (
    <Modal
      open={open}
      title="Tạo một sách mới"
      okText="Tạo sách"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as TourType;
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
          <Select
            mode="multiple"
            className="dk-w-full"
            options={[
              ...tourTypes?.map((ob: TourType) => {
                return { value: ob.TourTypeId, label: ob.Name, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("Description", value);
            }}
          />
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
        <Form.Item name="PromotionId" label="Ưu đãi" className="dk-w-full">
        <Input />
        </Form.Item>
        <Form.Item name="Img" label="Ảnh đại diện" className="dk-w-full">
          <Input />
        </Form.Item>
        <Form.Item name="IsLocal" label="Địa lý" className="dk-w-full">
          <Input />
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
  const { TourTypes, Save, Form } = props;

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
        Thêm tour
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        tourTypes={TourTypes}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddRecord;