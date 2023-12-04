import { Booking, Customer, Promotion, Tour, TourType } from "Models";
import { FormInstance, Popconfirm } from "antd";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import format from 'date-fns/format';

const Columns = (
  setSearchText: any,
  setSearchedColumn: any,
  searchInput: any,
  searchedColumn: any,
  searchText: any,
  bookings: Booking[],
  setBookings: any,
  isEditing: any,
  edit: any,
  save: any,
  cancel: any,
  form: FormInstance,
  handleDelete: any,
  setPopup: any,
  customers: Customer[],
  tours: Tour[],
) => [
  {
    title: "Booking Id",
    dataIndex: "BookingID",
    ...GetColumnSearchProps(
      "BookingID",
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
    title: "Khách hàng",
    className: "column-money",
    dataIndex: "CustomerID",
    ...GetColumnSearchProps(
      "CustomerID",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (id: number) => (
      <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {
          customers.find((customer: Customer) => customer.CustomerID === id)?.FirstName + 
          " " + 
          customers.find((customer: Customer) => customer.CustomerID === id)?.LastName
        }
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Tour",
    className: "column-money",
    dataIndex: "TourID",
    render: (id: number) => (
      <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {
          tours.find((tour: Tour) => tour.TourID === id)?.TourName
        }
      </p>
    ),
    ...GetColumnSearchProps(
      "TourID",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Ngày booking",
    className: "column-money",
    dataIndex: "BookingDate",
    ...GetColumnSearchProps(
      "Discount",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (date: Date) => (
      <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {format(date ? new Date(date) : new Date(), 'dd-MM-yyyy')}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Cập nhật",
    dataIndex: "operation",
    align: "center",
    width: "13%",
    fixed: 'right',
    render: (_: any, record: Promotion) => {
      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
           <EditRecord
              onInit={() => {
                edit(record, record?.PromotionID?.toString() || "");
              }}
              Save={() => save(record?.PromotionID || "")}
              Cancel={cancel}
              Form={form}
              Bookings={bookings}
            />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={async () => {
              const result = await handleDelete(record.PromotionID,bookings,setBookings);
              setPopup({
                title: result?.status == 200 ? "Thành công" : "Thất bại",
                messagePopup: result?.message,
                state: result?.status == 200
              })
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
