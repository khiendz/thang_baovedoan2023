import { Customer, CustomerSupport, Promotion, TourType } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import { CustomerType } from "Models/CustomerType.model";
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
  setCustomerSupports: any,
  setPopup: any,
  customerSupports: CustomerSupport[],
) => [
  {
    title: "Khách hàng",
    dataIndex: "CustomerID",
    width: "200px",
    ...GetColumnSearchProps(
      "CustomerID",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (customerId: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{customerId}</p>
    ),
    editable: true,
  },
  {
    title: "Loại support",
    className: "column-money",
    dataIndex: "SupportTypeId",
    width: "450px",
    ...GetColumnSearchProps(
      "SupportTypeId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (supportTypeId: number) => (
        <p className="dk-font-Inter dk-text-sm dk-font-semibold">{supportTypeId}</p>
      ),
    editable: true,
    align: "left",
  },
  {
    title: "Ngày báo hỗ trợ",
    className: "column-money",
    dataIndex: "SupportDate",
    width: "200px",
    ...GetColumnSearchProps(
      "SupportDate",
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
    align: "left",
  },
  {
    title: "Mô tả",
    className: "column-money",
    dataIndex: "Description",
    width: "450px",
    ...GetColumnSearchProps(
      "Description",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (description: string) => (
        <p className="dk-font-Inter dk-text-sm dk-font-semibold">{description}</p>
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
    render: (_: any, record: CustomerSupport) => {
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
                customerSupports,
                setCustomerSupports
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
