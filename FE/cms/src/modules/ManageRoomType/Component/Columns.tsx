import { Account, RoleAccount, RoomType } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";

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
  setRoomTypes: any,
  setPopup: any,
  roomTypes: RoomType[]
) => [
  {
    title: "Tên kiểu phòng",
    dataIndex: "Name",
    ...GetColumnSearchProps(
      "Name",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (name: string) => (
      <a className="dk-font-Inter dk-text-sm dk-font-semibold">{name}</a>
    ),
    editable: true,
  },
  {
    title: "Số lượng người tối đa",
    className: "column-money",
    dataIndex: "MaxOccupancy",
    width: "27%",
    ...GetColumnSearchProps(
      "MaxOccupancy",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (maxOccupancy: string) => (
      <div className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {maxOccupancy}
      </div>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Cập nhật",
    dataIndex: "operation",
    align: "center",
    width: "13%",
    fixed: "right",
    render: (_: any, record: RoomType) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.RoomTypeId?.toString() || "");
            }}
            Save={() => save(record?.RoomTypeId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc muốn xóa kiểu phòng này không"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.RoomTypeId,
                roomTypes,
                setRoomTypes
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
