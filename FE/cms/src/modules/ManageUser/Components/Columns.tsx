import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import { CustomerType } from "Models/CustomerType.model";
import { User } from "Models";

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
  setCustomerTypes: any,
  setPopup: any,
  customerTypes: CustomerType[]
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
    render: (firstName: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{firstName}</p>
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
    render: (lastName: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{lastName}</p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Địa chỉ",
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
    title: "Số điện thoại",
    className: "column-money",
    dataIndex: "Phone",
    width: "450px",
    ...GetColumnSearchProps(
      "Phone",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (phone: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{phone}</p>
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
    render: (_: any, record: User) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.UserId?.toString() || "");
            }}
            Save={() => save(record?.UserId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa người dùng này ?"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.UserId,
                customerTypes,
                setCustomerTypes
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