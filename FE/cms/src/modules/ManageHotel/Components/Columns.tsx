import { Hotel } from "Models";
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
  setHotels: any,
  setPopup: any,
  hotels: Hotel[]
) => [
  {
    title: "Tên khách sạn",
    dataIndex: "Name",
    width: "200px",
    ...GetColumnSearchProps(
      "Name",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (name: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{name}</p>
    ),
    editable: true,
  },
  {
    title: "Địa chỉ khách sạn",
    className: "column-money",
    dataIndex: "Address",
    width: "450px",
    ...GetColumnSearchProps(
      "Address",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (address: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{address}</p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Thành phố",
    className: "column-money",
    dataIndex: "City",
    width: "200px",
    ...GetColumnSearchProps(
      "City",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (city: string) => (
      <p className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {city}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Quốc gia",
    className: "column-money",
    dataIndex: "Country",
    width: "450px",
    ...GetColumnSearchProps(
      "Country",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (country: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{country}</p>
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
    render: (_: any, record: Hotel) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.HotelId?.toString() || "");
            }}
            Save={() => save(record?.HotelId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa khách sạn này ?"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.HotelId,
                hotels,
                setHotels
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
