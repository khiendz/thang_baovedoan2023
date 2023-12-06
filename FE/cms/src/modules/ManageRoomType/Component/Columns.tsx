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
    title: "Tên phòng",
    dataIndex: "Name",
    width: "300px",
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
    width: "150px",
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
    title: "Giá phòng",
    className: "column-money",
    dataIndex: "Price",
    width: "270px",
    ...GetColumnSearchProps(
      "Price",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (price: number) => (
      <div className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {price}
      </div>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Khách sạn",
    className: "column-money",
    dataIndex: "HotelId",
    width: "300px",
    ...GetColumnSearchProps(
      "HotelId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (hotelId: number, record: RoomType) => (
      <div className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {record.Hotel?.Name}
      </div>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Phí trả trễ phòng",
    className: "column-money",
    dataIndex: "KateFee",
    width: "270px",
    ...GetColumnSearchProps(
      "KateFee",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (kateFee: number) => (
      <div className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {kateFee}
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
