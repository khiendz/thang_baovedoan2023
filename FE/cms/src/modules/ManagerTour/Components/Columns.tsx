import { Tour, TourType } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import format from "date-fns/format";
import { JoinFileCDN } from "services/file-service";

const Columns = (
  setSearchText: any,
  setSearchedColumn: any,
  searchInput: any,
  searchedColumn: any,
  searchText: any,
  tours: Tour[],
  isEditing: any,
  edit: any,
  save: any,
  cancel: any,
  form: FormInstance,
  handleDelete: any,
  setTour: any,
  setPopup: any
) => [
  {
    title: "Người dùng đặt tour",
    dataIndex: "TourName",
    width: "250px",
    ...GetColumnSearchProps(
      "TourName",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (name: string, record: Tour) => (
      <div className="dk-font-Inter dk-text-sm dk-font-semibold dk-flex dk-flex-col">
        {" "}
        <span className="dk-font-Roboto dk-font-bold">
          Tên khách đặt tour:{" "}
          <span className="dk-font-normal">
            {record?.Bookings[0]?.Customer?.FirstName +
              " " +
              record?.Bookings[0]?.Customer?.LastName}
          </span>
        </span>
        <div className="dk-font-Roboto dk-font-bold dk-flex dk-gap-2">
          Email:
          <span className="dk-font-normal">
            {record.Bookings[0]?.Customer?.Email}
          </span>
        </div>
        <div className="dk-font-Roboto dk-font-bold dk-flex dk-gap-2">
          Số điện thoại:
          <span className="dk-font-normal">
            {record?.Bookings[0]?.Customer?.Phone}
          </span>
        </div>
        <div className="dk-font-Roboto dk-font-bold dk-flex dk-gap-2">
          Mã thanh toán:
          <span className="dk-font-normal">
            {record?.Bookings[0]?.Payments[0]?.OrderCode}
          </span>
        </div>
      </div>
    ),
    editable: true,
  },
  {
    title: "Tên Tour",
    dataIndex: "TourName",
    width: "250px",
    ...GetColumnSearchProps(
      "TourName",
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
    title: "Mô tả",
    className: "column-money dk-text-wrap",
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
      <p className="dk-block dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-3 dk-w-full">
        {description}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Tổng tiền",
    className: "column-money",
    dataIndex: "PriceTotal",
    width: "200px",
    ...GetColumnSearchProps(
      "PriceElder",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (PriceElder: number) => (
      <p className="dk-font-Inter dk-text-sm dk-bg-green-800 dk-font-bold dk-rounded dk-text-[#FFF] dk-p-1 dk-w-fit">
        {PriceElder.toLocaleString("vi-VN")} VND
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Ngày bắt đầu",
    className: "column-money",
    dataIndex: "StartDate",
    width: "150px",
    ...GetColumnSearchProps(
      "StartDate",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (date: Date) => (
      <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {format(date ? new Date(date) : new Date(), "dd-MM-yyyy")}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Ngày kết thúc",
    className: "column-money",
    dataIndex: "EndDate",
    width: "150px",
    ...GetColumnSearchProps(
      "EndDate",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (date: Date) => (
      <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {format(date ? new Date(date) : new Date(), "dd-MM-yyyy")}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Tổng thành viên",
    className: "column-money",
    dataIndex: "TotalMember",
    width: "150px",
    ...GetColumnSearchProps(
      "TotalMember",
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
    title: "Tổng người lớn",
    className: "column-money",
    dataIndex: "TotalElder",
    width: "150px",
    ...GetColumnSearchProps(
      "TotalElder",
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
    title: "Tổng trẻ em",
    className: "column-money",
    dataIndex: "TotalChd",
    width: "150px",
    ...GetColumnSearchProps(
      "TotalChd",
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
    title: "Tour Type",
    className: "column-money",
    dataIndex: "TourTypeID",
    width: "350px",
    ...GetColumnSearchProps(
      "TourTypeID",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (RoomTypeId: number, record: Tour) => (
      <div className="dk-font-Inter dk-text-sm dk-font-semibold dk-flex dk-flex-col">
        {" "}
        <span className="dk-font-Roboto dk-font-bold">
          Tên kiểu tour:{" "}
          <span className="dk-font-normal">{record.TourType?.Name}</span>
        </span>
        <div className="dk-font-Roboto dk-font-bold dk-gap-2 dk-line-clamp-3 dk-overflow-hidden">
          Mô tả kiểu tour:
          <div
            className="dk-font-normal"
            dangerouslySetInnerHTML={{
              __html: record?.TourType?.Description || "",
            }}
          ></div>
        </div>
      </div>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Kiểu phòng",
    className: "column-money",
    dataIndex: "RoomTypeId",
    width: "250px",
    ...GetColumnSearchProps(
      "RoomTypeId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (RoomTypeId: number, record: Tour) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold dk-flex dk-flex-col">
        {" "}
        <span className="dk-font-Roboto dk-font-bold">
          Khách sạn:{" "}
          <span className="dk-font-normal">{record.RoomType?.Hotel?.Name}</span>
        </span>
        <span className="dk-font-Roboto dk-font-bold">
          Tên phòng:{" "}
          <span className="dk-font-normal">{record.RoomType?.Name}</span>
        </span>
        <span className="dk-font-Roboto dk-font-bold">
          Giá phòng:{" "}
          <span className="dk-font-normal">{record?.RoomType?.Price}</span>
        </span>
        <span className="dk-font-Roboto dk-font-bold">
          Số lượng người tối đa có thể ở:{" "}
          <span className="dk-font-normal">
            {record?.RoomType?.MaxOccupancy}
          </span>
        </span>
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Ngày thuê phòng bắt đầu",
    className: "column-money",
    dataIndex: "RoomStartDate",
    width: "150px",
    ...GetColumnSearchProps(
      "RoomStartDate",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (date: Date) => (
      <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {format(date ? new Date(date) : new Date(), "dd-MM-yyyy")}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Ngày thuê phòng kết thúc",
    className: "column-money",
    dataIndex: "RoomEndDate",
    width: "150px",
    ...GetColumnSearchProps(
      "RoomEndDate",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (date: Date) => (
      <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {format(date ? new Date(date) : new Date(), "dd-MM-yyyy")}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Ảnh đại diện",
    className: "column-money",
    dataIndex: "Img",
    width: "250px",
    render: (img: any) => (
      <img src={JoinFileCDN(img)} className="dk-w-[250px] dk-aspect-[3/2]" />
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Địa điểm",
    className: "column-money",
    dataIndex: "Location",
    width: "450px",
    ...GetColumnSearchProps(
      "Location",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (description: string) => (
      <div
        className="dk-max-w-full dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Tình trạng thanh toán",
    className: "column-money",
    dataIndex: "TourID",
    width: "450px",
    ...GetColumnSearchProps(
      "TourID",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (tourID: number, record: Tour) => (
      <div
        className="dk-max-w-full dk-text-sm dk-font-bold dk-font-Inter dk-line-clamp-5"
      >
        {
          record.Bookings[0].Payments[0] != null ? 
          <div className="dk-p-1 dk-bg-green-500 dk-rounded-lg dk-w-fit dk-text-[#FFF]">Đã thanh toán</div> : 
          <div className="dk-p-1 dk-bg-red-500 dk-rounded-lg dk-w-fit dk-text-[#FFF]">Chưa thanh toán</div>
        }
      </div>
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
    render: (_: any, record: Tour) => {
      const editable = isEditing(record);
      const missBooking = record.Bookings.map((ele) => {
        return ele.BookingID;
      }).join(", ");

      const titleDelete = () => {
        return missBooking ? (
          <div className="dk-flex dk-flex-col dk-gap-2 dk-max-w-[450px]">
            <span className="dk-font-medium dk-font-Inter dk-text-sm dk-text-[#222]">
              Việc xóa tour này sẽ bao gồm xóa cả những booking liên quan:
            </span>
            <span className="dk-font-semibold dk-font-Inter dk-text-sm dk-text-[#222]">
              {missBooking} ?
            </span>
          </div>
        ) : (
          "Sure to delete?"
        );
      };
      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.TourTypeId?.toString() || "");
            }}
            Save={() => save(record?.TourTypeId || "")}
            Cancel={cancel}
            Form={form}
            Tours={tours}
          />
          <Popconfirm
            title={titleDelete}
            onConfirm={async () => {
              const result = await handleDelete(record.TourID, tours, setTour);
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
