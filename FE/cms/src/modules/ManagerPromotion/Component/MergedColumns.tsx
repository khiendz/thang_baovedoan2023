import { Promotion, TourType } from "Models";

const MergedColumns = (columns: any, tourTypes: TourType[], promotions: Promotion[], isEditing: any, form: any) => columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";
   
    return {
      ...col,
      onCell: (record: Promotion) => ({
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