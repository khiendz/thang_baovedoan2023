import { Tour } from "Models";
import { FormInstance } from "antd";

const MergedColumns = (columns: any, isEditing: any, tours: Tour[], form: FormInstance) => columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";

    return {
      ...col,
      onCell: (record: Tour) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        tours: tours,
        editing: record ? isEditing(record).toString() : "true",
        form: form,
      }),
    };
  });

export default MergedColumns;