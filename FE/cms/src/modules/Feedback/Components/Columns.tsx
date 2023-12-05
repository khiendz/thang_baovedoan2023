import { Customer, Feedback, Promotion, TourType } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import { CustomerType } from "Models/CustomerType.model";

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
  setFeedbacks: any,
  setPopup: any,
  feedbacks: Customer[],
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
    title: "Tour",
    className: "column-money",
    dataIndex: "Tour",
    width: "450px",
    ...GetColumnSearchProps(
      "Tour",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (tourID: number) => (
        <p className="dk-font-Inter dk-text-sm dk-font-semibold">{tourID}</p>
      ),
    editable: true,
    align: "left",
  },
  {
    title: "Đánh giá",
    className: "column-money",
    dataIndex: "Rating",
    width: "200px",
    ...GetColumnSearchProps(
      "Rating",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (rating: number) => (
      <p
        className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5"
      >
        {rating}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Nội dung phản hồi",
    className: "column-money",
    dataIndex: "Comment",
    width: "200px",
    ...GetColumnSearchProps(
      "Comment",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (comment: string) => (
      <p
        className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5"
      >
        {comment}
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
    render: (_: any, record: Feedback) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.FeedbackID?.toString() || "");
            }}
            Save={() => save(record?.FeedbackID || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa phản hồi này"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.CustomerID,
                feedbacks,
                setFeedbacks
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
