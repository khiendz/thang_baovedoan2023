import { Promotion, TourType } from "Models";
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
  promotions: Promotion[],
  tourTypes: TourType[],
  setPromotion: any,
  isEditing: any,
  edit: any,
  save: any,
  cancel: any,
  form: FormInstance,
  handleDelete: any,
  setPopup: any
) => [
  {
    title: "Tên ưu đãi",
    dataIndex: "Name",
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
    title: "Mã ưu đãi",
    className: "column-money",
    dataIndex: "PromoCode",
    ...GetColumnSearchProps(
      "PromoCode",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (code: string) => (
      <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {code}
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
    title: "Tỉ lệ ưu đãi",
    className: "column-money",
    dataIndex: "Discount",
    ...GetColumnSearchProps(
      "Discount",
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
    title: "Ngày bắt đầu",
    className: "column-money",
    dataIndex: "StartDate",
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
    title: "Kiểu Tour",
    className: "column-money",
    dataIndex: "TourTypeId",
    ...GetColumnSearchProps(
      "TourTypeId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (tourType: number) => (
      <p>{tourTypes.find((ob) => ob.TourTypeId === tourType)?.Name || "Không áp dụng kiểu tour"}</p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "operation",
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
              TourTypes={tourTypes}
              Promotions={promotions}
            />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={async () => {
              const result = await handleDelete(record.PromotionID,promotions,setPromotion);
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
