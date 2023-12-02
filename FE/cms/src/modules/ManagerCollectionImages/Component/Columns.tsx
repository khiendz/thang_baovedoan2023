import { CollectionImage, TourType } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import { JoinFileCDN } from "services/file-service";

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
  setCollections: any,
  setPopup: any,
  collections: CollectionImage[],
  tourTypes: TourType[]
) => [
  {
    title: "Tên ảnh",
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
    title: "Nguồn ảnh",
    className: "column-money",
    dataIndex: "Src",
    width: "27%",
    ...GetColumnSearchProps(
      "Description",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (src: string) => (
      <div className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {src}
      </div>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Ảnh đại diện",
    className: "column-money",
    dataIndex: "Src",
    render: (img: any) => (
      <img src={JoinFileCDN(img)} className="dk-w-[150px] dk-aspect-[3/2]" />
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Tên tour",
    className: "column-money",
    dataIndex: "TourTypeId",
    render: (TourTypeId: number) => (
      <p>{tourTypes.filter((ob) => ob.TourTypeId == TourTypeId)[0]?.Name}</p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Cập nhật",
    dataIndex: "operation",
    align: "center",
    width: "13%",
    fixed: "right",
    render: (_: any, record: CollectionImage) => {

      const editable = isEditing(record);
      
      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.CollectImgId?.toString() || "");
            }}
            Save={() => save(record?.CollectImgId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc muốn xóa ảnh này không"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.CollectImgId,
                collections,
                setCollections
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
