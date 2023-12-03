import { Tour, TourType } from "Models";
import GetColumnSearchProps
 from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import format from 'date-fns/format';
import { JoinFileCDN } from "services/file-service";

const Columns = (
    setSearchText:any,
    setSearchedColumn: any
    ,searchInput: any,
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
      title: "Tên Tour",
      dataIndex: "TourName",
      width: "250px",
      ...GetColumnSearchProps("TourName",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (name: string) => (
        <a className="dk-font-Inter dk-text-sm dk-font-semibold">{name}</a>
      ),
      editable: true,
    },
    {
      title: "Mô tả",
      className: "column-money",
      dataIndex: "Description",
      width: "150px",
      ...GetColumnSearchProps("Description",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (description: string) => (
        <p className="dk-block dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter">
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
      width: "150px",
      ...GetColumnSearchProps("PriceElder",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
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
          {format(date ? new Date(date) : new Date(), 'dd-MM-yyyy')}
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
          {format(date ? new Date(date) : new Date(), 'dd-MM-yyyy')}
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
      ...GetColumnSearchProps("TotalMember",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Tổng người lớn",
      className: "column-money",
      dataIndex: "TotalElder",
      width: "150px",
      ...GetColumnSearchProps("TotalElder",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Tổng trẻ em",
      className: "column-money",
      dataIndex: "TotalChd",
      width: "150px",
      ...GetColumnSearchProps("TotalChd",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Tour Type",
      className: "column-money",
      dataIndex: "TourTypeID",
      width: "150px",
      ...GetColumnSearchProps("TourTypeID",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Kiểu phòng",
      className: "column-money",
      dataIndex: "RoomTypeId",
      width: "150px",
      ...GetColumnSearchProps("RoomTypeId",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Ngày thuê phòng bắt đầu",
      className: "column-money",
      dataIndex: "RoomStartDate",
      width: "150px",
      ...GetColumnSearchProps("RoomStartDate",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (date: Date) => (
        <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
          {format(date ? new Date(date) : new Date(), 'dd-MM-yyyy')}
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
      ...GetColumnSearchProps("RoomEndDate",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (date: Date) => (
        <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
          {format(date ? new Date(date) : new Date(), 'dd-MM-yyyy')}
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
        >
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
      fixed: 'right',
      render: (_: any, record: Tour) => {
        const editable = isEditing(record);
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
              title="Sure to delete?"
              onConfirm={async () => {
                const result = await handleDelete(record.TourID,tours,setTour);
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