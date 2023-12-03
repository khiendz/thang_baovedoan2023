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
import dayjs from "dayjs";
import { Promotion, TourType } from "Models";
import TextEditor from "components/TextEditor";

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  tourTypes: TourType[];
  promotions: Promotion[];
  save: any;
  form: FormInstance;
}

interface Props {
  TourTypes: TourType[];
  Promotions: Promotion[];
  onInit: any;
  Cancel: any;
  Save: any;
  Form: FormInstance;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  tourTypes,
  promotions,
  save,
  form,
}) => {
  form?.setFieldValue(
    "StartDate",
    form?.getFieldValue("StartDate")
      ? dayjs(form?.getFieldValue("StartDate"))
      : dayjs(new Date())
  );
  form?.setFieldValue(
    "EndDate",
    form?.getFieldValue("EndDate")
      ? dayjs(form?.getFieldValue("EndDate"))
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
          name="Name"
          label="Tên ưu đãi"
          rules={[{ required: true, message: "Làm ơn nhập tên ưu đãi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Description" label="Mô tả ưu đãi">
          <TextEditor
            initialValues={form?.getFieldValue("Description")}
            onChange={(value: any) => {
              form.setFieldValue("Description", value);
            }}
          />
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
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="StartDate"
          label="Ngày bắt đầu"
          rules={[{ required: true, message: "Làm ơn nhập ngày bắt đầu!" }]}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
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
        >
          <DatePicker
            format={"DD-MM-YYYY"}
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

const EditRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { TourTypes, Save, Form, Promotions, onInit, Cancel } = props;

  useEffect(() => {
    if (open) {
      onInit();
      Form?.setFieldValue(
        "StartDate",
        Form?.getFieldValue("StartDate")
          ? dayjs(Form?.getFieldValue("StartDate"))
          : dayjs(new Date())
      );
      Form?.setFieldValue(
        "EndDate",
        Form?.getFieldValue("EndDate")
          ? dayjs(Form?.getFieldValue("EndDate"))
          : dayjs(new Date())
      );
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
        Sửa ưu đãi
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        tourTypes={TourTypes}
        promotions={Promotions}
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
