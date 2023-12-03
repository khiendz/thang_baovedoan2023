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
import { Promotion, TourType } from "Models";
import UploadFileImage from "components/UploadFileImage";
import { useAppContext } from "hook/use-app-context";
import dayjs from "dayjs";
import TextEditor from "components/TextEditor";
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

const { TextArea } = Input;

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  save,
  form,
  setPopup,
}) => {
  const { data: tourTypes, setData: setTourTypes } =
    useAppContext("tour-types");
  const { data: promotions } = useAppContext("promotions");
  return (
    <Modal
      open={open}
      title="Tạo một loại tour mới"
      okText="Tạo loại tour"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as TourType;
        const result = await save(
          {
            ...row,
            Description: row.Description?.toString(),
            PriceElder: parseInt(
              row?.PriceElder ? row?.PriceElder?.toString() : "0"
            ),
            PriceChildren: parseInt(
              row?.PriceChildren ? row?.PriceChildren?.toString() : "0"
            ),
            RateTourType: parseInt(
              row?.RateTourType ? row?.RateTourType?.toString() : "0"
            ),
            MaxSlot: parseInt(
              row?.MaxSlot ? row?.MaxSlot?.toString() : "0"
            ),
            OrderSlot: parseInt(
              row?.MaxSlot ? row?.MaxSlot?.toString() : "0"
            ),
          },
          setTourTypes,
          tourTypes
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
          label="Tên tour"
          rules={[{ required: true, message: "Làm ơn nhập tên tour" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Description" label="Mô tả tour">
          <TextEditor
            initialValues={form?.getFieldValue("Description")}
            onChange={(value: any) => {
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
          <Input />
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
        <Form.Item
          name="Img"
          label="Ảnh đại diện"
          className="dk-w-full dk-flex dk-justify-center"
        >
          <UploadFileImage lengthMaxImage={1} form={form} keyField="Img" />
        </Form.Item>
        <Form.Item
          name="IsLocal"
          label="Địa lý"
          className="dk-w-full"
          rules={[{ required: true, message: "Làm ơn chọn địa lý" }]}
        >
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
        <Form.Item
          name="StartDate"
          label="Ngày bắt đầu"
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
          label="Ngày kết thúc"
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
          rules={[
            { required: true, message: "Làm ơn nhập số lượng người tối đa" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="OrderSlot"
          label="Số lượng người đã đặt"
          rules={[
            { required: true, message: "Làm ơn nhập số lượng người đã đặt" },
          ]}
        >
          <Input type="number" />
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
        Thêm loại tour
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        setPopup={setPopup}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddRecord;
