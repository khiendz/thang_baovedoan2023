import React, { useState } from "react";
import { Button, Form, FormInstance, Input, Modal } from "antd";
import { RoomType } from "Models";
import { useAppContext } from "hook/use-app-context";

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
  const { data: roomTypes, setData: setRoomTypes } =
    useAppContext("room-types");
  return (
    <Modal
      open={open}
      title="Thêm một kiểu phòng mới"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as RoomType;
        const result = await save(
          {
            ...row,
          },
          setRoomTypes,
          roomTypes
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
          label="Tên phòng"
          rules={[{ required: true, message: "Làm ơn nhập tên tên phòng" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="MaxOccupancy"
          label="Số lượng người tối đa"
          rules={[
            { required: true, message: "Làm ơn nhập số lượng người tối đa" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Price"
          label="Giá phòng"
          rules={[{ required: true, message: "Làm ơn nhập giá phòng" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="HotelId"
          label="Khách sạn"
          rules={[{ required: true, message: "Làm ơn chọn khách sạn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="KateFee"
          label="Phí trễ hạn"
          rules={[{ required: true, message: "Làm ơn nhập phí trễ hạn" }]}
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
        Thêm kiểu phòng
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
