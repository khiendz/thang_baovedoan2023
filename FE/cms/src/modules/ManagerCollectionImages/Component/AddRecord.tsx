import React, { useState } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";
import { CollectionImage, TourType } from "Models";
import UploadFileImage from "components/UploadFileImage";
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
  const { data: tourTypes } = useAppContext("tour-types");
  const { data: collections, setData: setCollection } = useAppContext("collection-images"); 
  return (
    <Modal
      open={open}
      title="Thêm một ảnh mới"
      okText="Thêm ảnh ảnh"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as CollectionImage;
        const result = await save({
          ...row
        },setCollection,collections);
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200
        })
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
          label="Tên ảnh"
          rules={[{ required: true, message: "Làm ơn nhập tên tour" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Src" label="nguồn ảnh">
            <UploadFileImage lengthMaxImage={1} form={form} keyField="Src"/>
        </Form.Item>
        <Form.Item name="TourTypeId" label="Tên tour" className="dk-w-full">
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
        Thêm ảnh
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
