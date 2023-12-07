import { Booking, Payment } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import format from 'date-fns/format';

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
  setPayments: any,
  setPopup: any,
  payments: Payment[],
  bookings: Booking[]
) => [
  {
    title: "Mã thanh toán",
    dataIndex: "PaymentID",
    width: "200px",
    ...GetColumnSearchProps(
      "PaymentID",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (paymentId: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{paymentId}</p>
    ),
  },
  {
    title: "Thông tin booking",
    className: "column-money",
    dataIndex: "BookingID",
    width: "450px",
    ...GetColumnSearchProps(
      "BookingID",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (bookingID: number, record: Payment) => (
      <div className="dk-font-Inter dk-text-sm dk-font-semibold dk-flex dk-flex-col">
        <p>Mã booking: {record?.BookingID}</p>
        <p>Tên khách hàng: {record?.Booking?.Customer?.LastName}</p>
        <p>Số điện thoại khách hàng {record?.Booking?.Customer?.Phone}</p>
        <p>Địa chỉ email khách hàng: {record?.Booking?.Customer?.Email}</p>
        <p>Tên tour: {record?.Booking?.Tour?.TourName}</p>
        <p>Số người lớn: {record?.Booking?.Tour?.TotalElder}</p>
        <p>Số trẻ em: {record?.Booking?.Tour?.TotalChd}</p>
        <p>Tổng tiền tạm tính: {record?.Booking?.Tour?.PriceTotal}</p>
      </div>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Thời gian thanh toán",
    className: "column-money",
    dataIndex: "PaymentDate",
    width: "200px",
    ...GetColumnSearchProps(
      "PaymentDate",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (paymentDate: Date) => (
      <p className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {format(paymentDate ? new Date(paymentDate) : new Date(), 'dd-MM-yyyy')}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Tổng tiền thanh toán",
    className: "column-money",
    dataIndex: "Amount",
    width: "200px",
    ...GetColumnSearchProps(
      "Amount",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (amount: number) => (
      <p className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {amount}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Mã thanh toán",
    className: "column-money",
    dataIndex: "OrderCode",
    width: "200px",
    ...GetColumnSearchProps(
      "OrderCode",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (orderCode: string) => (
      <p className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {orderCode}
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
    render: (_: any, record: Payment) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.PaymentID?.toString() || "");
            }}
            Save={() => save(record?.PaymentID || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa thông tin thanh toán này"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.PaymentID,
                payments,
                setPayments
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
