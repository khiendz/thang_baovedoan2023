import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
} from "antd";
import { Tour } from "Models";
import UploadFileImage from "components/UploadFileImage";
import dayjs from "dayjs";
interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  tours: Tour[];
  save: any;
  form: FormInstance;
  setTour: any;
  setPopup: any;
}

interface Props {
  Tours: Tour[];
  Save: any;
  Form: FormInstance;
  setTour: any;
  setPopup: any;
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
  tours,
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
          name="TourName"
          label="Tên tour"
          rules={[{ required: true, message: "Làm ơn nhập tên tour" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Description" label="Mô tả tour">
          <TextArea />
        </Form.Item>
        <Form.Item
          name="PriceTotal"
          label="Tổng tiền"
          rules={[{ required: true, message: "Làm ơn nhập tổng tiền" }]}
        >
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
          name="TotalMember"
          label="Tổng thành viên"
          rules={[{ required: true, message: "Làm ơn nhập tổng thành viên" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="TotalElder"
          label="Tổng người lớn"
          rules={[{ required: true, message: "Làm ơn nhập tổng người lớn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="TotalChd"
          label="Tổng trẻ em"
          rules={[{ required: true, message: "Làm ơn nhập tổng trẻ em" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="TourTypeID"
          label="Kiểu tour"
          rules={[{ required: true, message: "Làm ơn nhập kiểu tour" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="TourTypeID"
          label="Kiểu phòng"
          rules={[{ required: true, message: "Làm ơn nhập kiểu phòng" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="RoomStartDate"
          label="Ngày thuê phòng bắt đầu"
          rules={[{ required: true, message: "Làm ơn nhập ngày thuê phòng bắt đầu" }]}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("RoomStartDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="RoomEndDate"
          label="Ngày thuê phòng kết thúc"
          rules={[{ required: true, message: "Làm ơn nhập ngày thuê phòng kết thúc!" }]}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("RoomStartDate", value);
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
          name="Location"
          label="Địa điểm"
          rules={[{ required: true, message: "Làm ơn nhập địa điểm!" }]}
        >
         <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Tours, Save, Form, setTour, setPopup } =
    props;

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
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddRecord;
