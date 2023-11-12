import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  InputRef,
  Popconfirm,
  Table,
  Typography,
  Input,
  Space,
  Button,
  Select,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { ColumnType } from "antd/es/table/interface";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { EditableCell } from "./EdittableCell";
import AddRecord from "./Component/AddRecord";
import { Promotion, TourType } from "Models";
import { AddTourType, DeleteTourTypeById, UpdateTourType, getAllTourType } from "services";
import "./style.scss";
import { getAllPromotion } from "services/promotion-services";

type DataIndex = keyof TourType;

const ManagerTourType = () => {
  const [tourTypes, setTourTypes] = useState<TourType[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const isEditing = (record: TourType) => record?.TourTypeId?.toString() === editingKey;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<TourType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Tên Tour",
      dataIndex: "Name",
      ...getColumnSearchProps("Name"),
      render: (name: string) => (
        <a className="dk-font-Inter dk-text-sm dk-font-semibold">{name}</a>
      ),
      editable: true,
    },
    {
      title: "Mô tả",
      className: "column-money",
      dataIndex: "Description",
      ...getColumnSearchProps("Description"),
      render: (description: string) => (
        <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
         {
            description
         }
        </p>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Giá tour người lớn",
      className: "column-money",
      dataIndex: "PriceElder",
      ...getColumnSearchProps("PriceElder"),
      editable: true,
      align: "left",
    },
    {
      title: "Giá tour trẻ nhỏ",
      className: "column-money",
      dataIndex: "PriceChildren",
      ...getColumnSearchProps("PriceChildren"),
      editable: true,
      align: "left",
    },
    {
      title: "Ưu đãi",
      className: "column-money",
      dataIndex: "PromotionId",
      ...getColumnSearchProps("PromotionId"),
      editable: true,
      align: "left",
    },
    {
      title: "Ảnh đại diện",
      className: "column-money",
      dataIndex: "Img",
      ...getColumnSearchProps("Img"),
      render: (img: any) => (
        <img src={img} className="dk-w-[150px] dk-aspect-[3/4]" />
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Địa lý",
      className: "column-money",
      dataIndex: "IsLocal",
      ...getColumnSearchProps("IsLocal"),
      render: (IsLocal: number) => (
        <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
         {
            IsLocal === 0 ? "Trong nước" : "Ngoài nước"
         }
        </p>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Đánh giá",
      className: "column-money",
      dataIndex: "RateTourType",
      ...getColumnSearchProps("RateTourType"),
      editable: true,
      align: "left",
    },
    {
      title: "operation",
      dataIndex: "operation",
      align: "center",
      render: (_: any, record: TourType) => {
        const editable = isEditing(record);
        return (
          <div className="dk-flex dk-gap-3 dk-text-[#1677ff] dk-w-[150px]">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.TourTypeId)}
            >
              <a>Delete</a>
            </Popconfirm>
            {editable ? (
              <span className="dk-block dk-w-[88px] dk-font-semibold">
                <Typography.Link
                  onClick={() => save(record?.TourTypeId || "")}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record, record.TourTypeId?.toString() || "")}
              >
                Edit
              </Typography.Link>
            )}
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";
   
    return {
      ...col,
      onCell: (record: TourType) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        tourTypes: tourTypes,
        promotions: promotions,
        editing: isEditing(record),
        form: form,
      }),
    };
  });

  const changeTourType = async (tourType: TourType) => {
    try {
      const result = await UpdateTourType(tourType);
      if (result) return result?.data;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleAddTourType = async (tourType: TourType) => {
    try {
      const result = await AddTourType(tourType);
      if (result) return result?.data;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const clearTheTourType = async (tourTypeId: number) => {
    if (!tourTypeId) return null;

    try {
      const result = await DeleteTourTypeById(tourTypeId);
      if (result) return result?.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TourType;
      const newData = [...tourTypes];
      const index = newData.findIndex((item) => key === item.TourTypeId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = changeTourType(newTourType);
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setTourTypes(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setTourTypes(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const handleDelete = async (key: number) => {
    const result = await clearTheTourType(key);
    const newData = tourTypes.filter((item: TourType) => item.TourTypeId !== key);
    setTourTypes(newData);
  };

  const handleAdd = async (tourType: TourType) => {
    const result = await handleAddTourType(tourType);
    setTourTypes([{ ...tourType, TourTypeId: tourTypes.length + 1 }, ...tourTypes]);
  };

  const edit = (record: TourType, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.TourTypeId?.toString() || "");
  };

  useEffect(() => {
    initData();
    initPromotion();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllTourType();
      if (result && result?.data) {
        setTourTypes(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initPromotion = async () => {
    try {
      const result = await getAllPromotion();
      if (result && result?.data) {
        setPromotions(result?.data?.reverse());
      }
    } catch (e) {}
  };

  return tourTypes ? (
    <Form form={form} component={false}>
      <AddRecord
        Save={handleAdd}
        Form={form}
        TourTypes={tourTypes}
        Promotions={promotions}
      />
      <Table
        columns={mergedColumns}
        dataSource={tourTypes}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowClassName="editable-row"
        bordered
      ></Table>
    </Form>
  ) : null;
};

export default ManagerTourType;
