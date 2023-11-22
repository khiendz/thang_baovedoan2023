import React, { useState } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";
import { Promotion, TourType } from "Models";
interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  tourTypes: TourType[],
  promotions: Promotion[],
  save: any;
  form: FormInstance;
  setTourTypes: any;
  setMessagePopup: any;
}

interface Props {
  TourTypes: TourType[];
  Promotions: Promotion[];
  Save: any;
  Form: FormInstance;
  setTourTypes: any;
  setMessagePopup: any;
}

const { TextArea } = Input;

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  promotions,
  save,
  form,
  setTourTypes,
  setMessagePopup,
  tourTypes
}) => {
  return (
    <Modal
      open={open}
      title="Tạo một loại tour mới"
      okText="Tạo loại tour"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as TourType;
        const result = await save({
          ...row,
          Description: row.Description?.toString(),
          PriceElder: parseInt(row?.PriceElder ? row?.PriceElder?.toString() : "0"),
          PriceChildren: parseInt(row?.PriceChildren ? row?.PriceChildren?.toString() : "0"),
          RateTourType: parseInt(row?.RateTourType ? row?.RateTourType?.toString() : "0"),
        },setTourTypes,tourTypes);
        setMessagePopup("Đã lưu thành công");
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
        <Form.Item name="PromotionId" label="Ưu đãi" className="dk-w-full">
          <Select
            className="dk-w-full"
            options={[
              ...promotions?.map((ob: Promotion) => {
                return { value: ob.PromotionID, label: ob.Name, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("Description", value);
            }}
           />
        </Form.Item>
        <Form.Item name="Img" label="Ảnh đại diện" className="dk-w-full">
          <Input />
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
  const { TourTypes, Save, Form, Promotions, setTourTypes, setMessagePopup } = props;

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
        tourTypes={TourTypes}
        promotions={Promotions}
        setTourTypes={setTourTypes}
        setMessagePopup={setMessagePopup}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddRecord;
