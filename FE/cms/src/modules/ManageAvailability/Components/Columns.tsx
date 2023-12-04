import { Account } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import format from "date-fns/format";

const Columns = (
  setSearchText: any,
  setSearchedColumn: any,
  searchInput: any,
  searchedColumn: any,
  searchText: any,
  isEditing: any,
  edit: any,
  save: any,
  cancel: any,
  form: FormInstance,
  handleDelete: any,
  setAvailabilities: any,
  setPopup: any,
  availabilities: Account[]
) => [
  {
    title: "Ngày kiểm tra phòng",
    dataIndex: "DateCheck",
    width: "200px",
    ...GetColumnSearchProps(
      "DateCheck",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (dateCheck: Date) => (
      <p className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {format(dateCheck ? new Date(dateCheck) : new Date(), "dd-MM-yyyy")}
      </p>
    ),
    editable: true,
  },
  {
    title: "Số lượng người còn có thể ở",
    className: "column-money",
    dataIndex: "AvailableRooms",
    width: "450px",
    ...GetColumnSearchProps(
      "AvailableRooms",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (availableRooms: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">
        {availableRooms}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Kiểu phòng",
    className: "column-money",
    dataIndex: "RoomTypeId",
    width: "200px",
    ...GetColumnSearchProps(
      "RoomTypeId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (roomTypeId: number) => (
      <p className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {roomTypeId}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Cập nhật",
    dataIndex: "operation",
    align: "center",
    width: "250px",
    fixed: "right",
    render: (_: any, record: Account) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.AccountId?.toString() || "");
            }}
            Save={() => save(record?.AccountId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa tình trạng phòng này"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.AccountId,
                availabilities,
                setAvailabilities
              );
              setPopup({
                title: result?.status == 200 ? "Thành công" : "Thất bại",
                messagePopup: result?.message,
                state: result?.status == 200,
              });
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        </div>
      );
    },
  },
];

export default Columns;
