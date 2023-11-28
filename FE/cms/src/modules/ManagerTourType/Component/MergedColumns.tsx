import { TourType } from "Models";
import { FormInstance } from "antd";
import { useAppContext } from "hook/use-app-context";

const MergedColumns = (columns: any, isEditing: any, form: FormInstance) => {
  const { data: tourTypes } = useAppContext("tour-types");
  const { data: promotions } = useAppContext("promotions");
  return columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";

    return {
      ...col,
      onCell: (record: TourType) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        tourTypes: tourTypes,
        promotions: promotions,
        editing: record ? isEditing(record).toString() : "true",
        form: form,
      }),
    };
  });
}


export default MergedColumns;