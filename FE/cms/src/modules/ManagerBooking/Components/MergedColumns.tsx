import { Promotion } from "Models";
import { useAppContext } from "hook/use-app-context";

const MergedColumns = (columns: any, isEditing: any, form: any) => {
  const { data: bookings, setData: setBookings } = useAppContext("booking");

  return columns.map((col: any) => {
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
        bookings: bookings,
        editing: record ? isEditing(record).toString() : "true",
        form: form,
      }),
    };
  });
};

export default MergedColumns;
