import React, { useState, useEffect } from "react";
import { Button, Form, FormInstance, Input, Modal, Select } from "antd";
import { useAppContext } from "hook/use-app-context";
import { Hotel } from "Models";

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
  const { data: hotels, setData: setHotels } = useAppContext("hotels");
  return (
    <Modal
      open={open}
      title="Cập nhật kiểu phòng"
      okText="Cập nhật"
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
            <Select
            className="dk-w-full"
            options={[
              ...hotels?.map((ob: Hotel) => {
                return { value: ob.HotelId, label: ob.Name, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("HotelId", value);
            }}
          />
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

const EditRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Save, Form, onInit, Cancel } = props;

  useEffect(() => {
    if (open) onInit();
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
        Cập nhật kiểu phòng
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
