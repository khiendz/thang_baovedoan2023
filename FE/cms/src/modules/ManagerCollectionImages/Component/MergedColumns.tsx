import { CollectionImage } from "Models";
import { FormInstance } from "antd";
import { useAppContext } from "hook/use-app-context";

const MergedColumns = (columns: any, isEditing: any, form: FormInstance) => {
  const { data: tourTypes } = useAppContext("tour-types");
  const { data: collections } = useAppContext("collection-images");
  return columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";

    return {
      ...col,
      onCell: (record: CollectionImage) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        tourTypes: tourTypes,
        collection: collections,
        editing: record ? isEditing(record).toString() : "true",
        form: form,
      }),
    };
  });
}


export default MergedColumns;