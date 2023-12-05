import { CustomerSupport } from "Models";
import { CustomerType } from "Models/CustomerType.model";
import { FormInstance } from "antd";
import { useAppContext } from "hook/use-app-context";

const MergedColumns = (columns: any, isEditing: any, form: FormInstance) => {
  const { data: customerTypes } = useAppContext("customer-types");
  return columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";

    return {
      ...col,
      onCell: (record: CustomerType) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        customerTypes: customerTypes,
        editing: record ? isEditing(record).toString() : "true",
        form: form,
      }),
    };
  });
};

export default MergedColumns;
