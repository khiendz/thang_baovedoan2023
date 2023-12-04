import { Customer, Promotion, TourType } from "Models";
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
  setCustomers: any,
  setPopup: any,
  customers: Customer[]
) => [
  {
    title: "Họ",
    dataIndex: "FirstName",
    width: "200px",
    ...GetColumnSearchProps(
      "FirstName",
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
    title: "Tên",
    className: "column-money",
    dataIndex: "LastName",
    width: "450px",
    ...GetColumnSearchProps(
      "LastName",
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
    align: "left",
  },
  {
    title: "Địa chỉ email",
    className: "column-money",
    dataIndex: "Email",
    width: "200px",
    ...GetColumnSearchProps(
      "Email",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (email: string) => (
      <p
        className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5"
      >
        {email}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Số điện thoại",
    className: "column-money",
    dataIndex: "Phone",
    width: "200px",
    ...GetColumnSearchProps(
      "Phone",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (Phone: string) => (
      <p
        className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5"
      >
        {Phone}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Địa chỉ",
    className: "column-money",
    dataIndex: "Address",
    width: "200px",
    render: (address: string) => (
      <p>{address}</p>
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
    render: (_: any, record: Customer) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.CustomerID?.toString() || "");
            }}
            Save={() => save(record?.CustomerID || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa thành viên này"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.CustomerID,
                customers,
                setCustomers
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
