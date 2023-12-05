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
  setCustomerTypes: any,
  setPopup: any,
  customerTypes: CustomerType[]
) => [
  {
    title: "Tên kiểu khách hàng",
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
    title: "Mô tả kiểu khách hàng",
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
    render: (_: any, record: CustomerType) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.CustomerTypeId?.toString() || "");
            }}
            Save={() => save(record?.CustomerTypeId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa thành viên này"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.CustomerTypeId,
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
