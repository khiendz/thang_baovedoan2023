import { Promotion, TourType } from "Models";
import { FormInstance } from "antd";

const MergedColumns = (columns: any, isEditing: any, tourTypes: TourType[], promotions: Promotion[], form: FormInstance) => columns.map((col: any) => {
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

export default MergedColumns;