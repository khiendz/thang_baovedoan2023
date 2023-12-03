import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";
import { Promotion } from "Models";
import UploadFileImage from "components/UploadFileImage";
import { useAppContext } from "hook/use-app-context";
import TextEditor from "components/TextEditor";
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

  form?.setFieldValue("StartDate", form?.getFieldValue("StartDate") ? dayjs(form?.getFieldValue("StartDate")) : dayjs(new Date()));
  form?.setFieldValue("EndDate", form?.getFieldValue("EndDate") ? dayjs(form?.getFieldValue("EndDate")) : dayjs(new Date()));

  const { data: promotions } = useAppContext("promotions");
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
        <Form.Item name="Description" label="Mô tả tour" className="dk-h-[600px]">
          <TextEditor 
            initialValues={form?.getFieldValue("Description")}
            onChange={
            (value: any) => {
              form.setFieldValue("Description", value);
            }
          }/>
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
        <Form.Item
          name="StartDate"
          label="Ngày khởi hành"
          rules={[{ required: true, message: "Làm ơn nhập ngày bắt đầu" }]}
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
          label="Ngày về"
          rules={[{ required: true, message: "Làm ơn nhập ngày kết thúc!" }]}
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
          name="MaxSlot"
          label="Số lượng người tối đa"
          rules={[{ required: true, message: "Làm ơn nhập số lượng người tối đa" }]}
        >
          <Input type="number"/>
        </Form.Item>
        <Form.Item
          name="OrderSlot"
          label="Số lượng người đã đặt"
          rules={[{ required: true, message: "Làm ơn nhập số lượng người đã đặt" }]}
        >
          <Input type="number"/>
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
    Form?.setFieldValue("StartDate", Form?.getFieldValue("StartDate") ? dayjs(Form?.getFieldValue("StartDate")) : dayjs(new Date()));
    Form?.setFieldValue("EndDate", Form?.getFieldValue("EndDate") ? dayjs(Form?.getFieldValue("EndDate")) : dayjs(new Date()));
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
