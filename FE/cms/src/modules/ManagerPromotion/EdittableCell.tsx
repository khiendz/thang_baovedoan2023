import dayjs from "dayjs";
import { Form, Input, Select, FormInstance, DatePicker, Space } from "antd";
import { Promotion, TourType } from "Models";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  tourTypes: TourType[];
  promotions: Promotion[];
  inputType: "date" | "text" | "select";
  form: FormInstance<any>;
  record: Promotion;
  index: number;
  children: React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  tourTypes,
  promotions,
  inputType,
  form,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode = null;
  let arrayValue: any = [];
  switch (dataIndex) {
    case "StartDate":
      inputNode = (
        <Space direction="vertical" size={12}>
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(record?.StartDate)}
            className="dk-w-[200px]"
            onChange={(value) => {
              form.setFieldValue(dataIndex, dayjs(value));
            }}
          />
        </Space>
      );
      break;
    case "EndDate":
      inputNode = (
        <Space direction="vertical" size={12}>
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(record?.EndDate)}
            className="dk-w-[200px]"
            onChange={(value) => {
              form.setFieldValue(dataIndex, dayjs(value));
            }}
          />
        </Space>
      );
      break;
    case "TourTypeId":
      inputNode = (
        <Space wrap className="dk-w-[250px]">
          <Select
            className="dk-w-[250px]"
            defaultValue={
              tourTypes.length > 0
              ? tourTypes.find((ob) => ob.TourTypeId === record.TourTypeId)?.Name || null
              : null
            }
            options={[
              ...tourTypes?.map((ob: TourType) => {
                return { value: ob.TourTypeId, label: ob.Name, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("TourTypeId", value);
            }}
          />
        </Space>
      );
      break;
    default:
      inputNode = <Input />;
      break;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
