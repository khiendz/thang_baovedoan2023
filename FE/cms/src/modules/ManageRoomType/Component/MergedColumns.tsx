import { RoomType } from "Models";
import { FormInstance } from "antd";
import { useAppContext } from "hook/use-app-context";

const MergedColumns = (columns: any, isEditing: any, form: FormInstance) => {
  const { data: roomTypes } = useAppContext("room-types");
  return columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";

    return {
      ...col,
      onCell: (record: RoomType) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        roomTypes: roomTypes,
        editing: record ? isEditing(record).toString() : "true",
        form: form,
      }),
    };
  });
};

export default MergedColumns;
