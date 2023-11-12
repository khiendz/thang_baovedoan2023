import dayjs from "dayjs";
import { Form, Input, Select, DatePicker, Space, FormInstance } from "antd";
import { TourType } from "Models";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  tourTypes: TourType[],
  inputType: "date" | "text" | "select";
  form: FormInstance<any>;
  record: TourType;
  index: number;
  children: React.ReactNode;
}

interface valueFiledSelect {
  value: string;
  label: string;
  ob: any;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  tourTypes,
  inputType,
  form,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode = null;
  let arrayValue: any = [];
  switch (inputType) {
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
