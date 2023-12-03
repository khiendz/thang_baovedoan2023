import { Promotion, TourType } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import { JoinFileCDN } from "services/file-service";
import { currencyFormat } from "utils/money";
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
  setTourType: any,
  setPopup: any,
  promotions: Promotion[],
  tourTypes: TourType[]
) => [
  {
    title: "Tên Tour",
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
      <a className="dk-font-Inter dk-text-sm dk-font-semibold">{name}</a>
    ),
    editable: true,
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
    title: "Giá tour người lớn",
    className: "column-money",
    dataIndex: "PriceElder",
    width: "200px",
    ...GetColumnSearchProps(
      "PriceElder",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (price: string) => (
      <p
        className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5"
      >
        {`${currencyFormat(price)}`}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Giá tour trẻ nhỏ",
    className: "column-money",
    dataIndex: "PriceChildren",
    width: "200px",
    ...GetColumnSearchProps(
      "PriceChildren",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (price: string) => (
      <p
        className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5"
      >
        {`${currencyFormat(price)}`}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Ưu đãi",
    className: "column-money",
    dataIndex: "PromotionId",
    width: "200px",
    render: (PromotionId: number) => (
      <p>{promotions.filter((ob) => ob.PromotionID == PromotionId)[0]?.Name}</p>
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
    title: "Địa lý",
    className: "column-money",
    dataIndex: "IsLocal",
    width: "150px",
    ...GetColumnSearchProps(
      "IsLocal",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (IsLocal: number) => (
      <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {IsLocal === 0 ? "Trong nước" : "Ngoài nước"}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Đánh giá",
    className: "column-money",
    dataIndex: "RateTourType",
    width: "100px",
    ...GetColumnSearchProps(
      "RateTourType",
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
    title: "Ngày khởi hành",
    className: "column-money",
    dataIndex: "StartDate",
    width: "150px",
    ...GetColumnSearchProps("StartDate",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
    render: (date: Date) => (
      <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {format(date ? new Date(date) : new Date(), 'dd-MM-yyyy')}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Ngày về",
    className: "column-money",
    dataIndex: "EndDate",
    width: "150px",
    ...GetColumnSearchProps("EndDate",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
    render: (date: Date) => (
      <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {format(date ? new Date(date) : new Date(), 'dd-MM-yyyy')}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Số lượng tối đa",
    className: "column-money",
    dataIndex: "MaxSlot",
    width: "100px",
    ...GetColumnSearchProps(
      "MaxSlot",
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
    title: "Số lượng người đã đặt",
    className: "column-money",
    dataIndex: "OrderSlot",
    width: "100px",
    ...GetColumnSearchProps(
      "OrderSlot",
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
    title: "Cập nhật",
    dataIndex: "operation",
    align: "center",
    width: "250px",
    fixed: "right",
    render: (_: any, record: TourType) => {
      const missPromotion = promotions
        .filter((ob: Promotion) => {
          if (ob.TourTypeId == record.TourTypeId) return ob;
        })
        .map((ele) => {
          return ele.Name;
        })
        .join(", ");
      const editable = isEditing(record);

      const titleDelete = () => {
        return (
          <div className="dk-flex dk-flex-col dk-gap-2 dk-max-w-[450px]">
            <span className="dk-font-medium dk-font-Inter dk-text-sm dk-text-[#222]">
              Việc xóa tour này sẽ bao gồm xóa cả những ưu đãi liên quan:
            </span>
            <span className="dk-font-semibold dk-font-Inter dk-text-sm dk-text-[#222]">
              {missPromotion} ?
            </span>
          </div>
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
          />
          <Popconfirm
            title={titleDelete}
            onConfirm={async () => {
              const result = await handleDelete(
                record.TourTypeId,
                tourTypes,
                setTourType
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
