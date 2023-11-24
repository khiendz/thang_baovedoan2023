import { Tour, TourType } from "Models";
import GetColumnSearchProps
 from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";

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
      width: '27%',
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
      ...GetColumnSearchProps("PriceElder",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Ảnh đại diện",
      className: "column-money",
      dataIndex: "Img",
      render: (img: any) => (
        <img src={img} className="dk-w-[150px] dk-aspect-[3/4]" />
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Địa điểm",
      className: "column-money",
      dataIndex: "Location",
      ...GetColumnSearchProps("IsLocal",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Đánh giá",
      className: "column-money",
      dataIndex: "RateTourType",
      ...GetColumnSearchProps("RateTourType",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Cập nhật",
      dataIndex: "operation",
      align: "center",
      width: "13%",
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