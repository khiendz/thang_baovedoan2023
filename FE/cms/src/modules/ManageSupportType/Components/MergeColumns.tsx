import { SupportType } from "Models/SupportType.model";
import { FormInstance } from "antd";
import { useAppContext } from "hook/use-app-context";

const MergedColumns = (columns: any, isEditing: any, form: FormInstance) => {
  const { data: supportTypes } = useAppContext("support-types");
  return columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";

    return {
      ...col,
      onCell: (record: SupportType) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        supportTypes: supportTypes,
        editing: record ? isEditing(record).toString() : "true",
        form: form,
      }),
    };
  });
};

export default MergedColumns;
