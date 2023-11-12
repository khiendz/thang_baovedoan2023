import dayjs from "dayjs";
import { Form, Input, Select, FormInstance } from "antd";
import { Promotion, TourType } from "Models";
import TextArea from "antd/es/input/TextArea";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  tourTypes: TourType[],
  promotions: Promotion[],
  inputType: "date" | "text" | "select";
  form: FormInstance<any>;
  record: TourType;
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
    case "PromotionId": 
      inputNode = <Select
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
     break;
     case "IsLocal": 
     inputNode =  <Select
     className="dk-w-full"
     options={[
       { value: 0, label: "Trong nước" },
       { value: 1, label: "Ngoài nước" },
     ]}
     onChange={(value) => {
       form.setFieldValue("Description", value);
     }}
   />
    break;
    case "Description": 
    inputNode =  <TextArea className="dk-w-[350px]"/>
   break;
   case "Name": 
   inputNode =  <TextArea className="dk-w-[350px]"/>
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
