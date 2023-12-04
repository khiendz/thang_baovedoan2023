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
import { Promotion, TourType } from "Models";
import TextEditor from "components/TextEditor";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  tourTypes: TourType[];
  promotions: Promotion[];
  setPromotion: any;
  save: any;
  form: FormInstance;
  setPopup: any;
}

interface Props {
  TourTypes: TourType[];
  Promotions: Promotion[];
  SetPromotion: any;
  Save: any;
  Form: FormInstance;
  setPopup: any;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  tourTypes,
  promotions,
  setPromotion,
  save,
  form,
  setPopup
}) => {
  return (
    <Modal
      open={open}
      title="Tạo một ưu đãi mới"
      okText="Tạo ưu đãi"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Promotion;
        const result = await save({
          ...row,
          Discount: parseInt(
            row?.Discount ? row?.Discount?.toString() : "0"
          )
        },setPromotion,promotions);
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200
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
          label="Tên ưu đãi"
          rules={[{ required: true, message: "Làm ơn nhập tên ưu đãi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Description" label="Mô tả ưu đãi">
        <TextEditor 
            initialValues={form?.getFieldValue("Description")}
            onChange={
            (value: any) => {
              form.setFieldValue("Description", value);
            }
          }/>
        </Form.Item>
        <Form.Item
          name="PromoCode"
          label="Mã ưu đãi"
          rules={[{ required: true, message: "Làm ơn nhập mã ưu đãi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Discount"
          label="Tỷ lệ ưu đãi"
          rules={[{ required: true, message: "Làm ơn nhập tỷ lệ ưu đãi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="StartDate"
          label="Ngày bắt đầu"
          rules={[{ required: true, message: "Làm ơn nhập ngày bắt đầu!" }]}
          valuePropName={'date'}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("StartDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="EndDate"
          label="Ngày kết thúc"
          rules={[{ required: true, message: "Làm ơn nhập ngày kết thúc!" }]}
          valuePropName={'date'}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("EndDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="TourTypeId"
          label="Áp dụng kiểu tour"
          className="dk-w-full"
        >
          <Select
            className="dk-w-full"
            options={[
              ...tourTypes?.map((ob: TourType) => {
                return { value: ob.TourTypeId, label: ob.Name, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("TourTypeId", value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { TourTypes, Save, Form, Promotions, SetPromotion, setPopup } = props;

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
        Thêm ưu đãi
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        tourTypes={TourTypes}
        promotions={Promotions}
        setPromotion={SetPromotion}
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
