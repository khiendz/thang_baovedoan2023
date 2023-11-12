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
import { AddPromotion, DeletePromotionById, UpdatePromotion, getAllPromotion } from "services/promotion-services";

type DataIndex = keyof Promotion;

const ManagerPromotion = () => {
  const [tourTypes, setTourTypes] = useState<TourType[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const isEditing = (record: Promotion) => record?.PromotionID?.toString() === editingKey;

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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Promotion> => ({
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
      title: "Tên ưu đãi",
      dataIndex: "Name",
      ...getColumnSearchProps("Name"),
      render: (name: string) => (
        <a className="dk-font-Inter dk-text-sm dk-font-semibold">{name}</a>
      ),
      editable: true,
    },
    {
      title: "Mã ưu đãi",
      className: "column-money",
      dataIndex: "PromoCode",
      ...getColumnSearchProps("PromoCode"),
      render: (code: string) => (
        <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
         {
            code
         }
        </p>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Mô tả",
      className: "column-money",
      dataIndex: "Description",
      ...getColumnSearchProps("Description"),
      editable: true,
      align: "left",
    },
    {
      title: "Tỉ lệ ưu đãi",
      className: "column-money",
      dataIndex: "Discount",
      ...getColumnSearchProps("Discount"),
      editable: true,
      align: "left",
    },
    {
      title: "Ngày bắt đầu",
      className: "column-money",
      dataIndex: "StartDate",
      ...getColumnSearchProps("StartDate"),
      editable: true,
      align: "left",
    },
    {
      title: "Ngày kết thúc",
      className: "column-money",
      dataIndex: "EndDate",
      ...getColumnSearchProps("EndDate"),
      editable: true,
      align: "left",
    },
    {
      title: "Kiểu Tour",
      className: "column-money",
      dataIndex: "TourTypeId",
      ...getColumnSearchProps("TourTypeId"),
      render: (tourType: number) => (
        <p>
          {
             tourTypes.find((ob) => ob.TourTypeId === tourType)?.Name
          }
        </p>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "operation",
      dataIndex: "operation",
      align: "center",
      render: (_: any, record: Promotion) => {
        const editable = isEditing(record);
        return (
          <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.PromotionID)}
            >
              <a>Delete</a>
            </Popconfirm>
            {editable ? (
              <span className="dk-block dk-w-[88px] dk-font-semibold">
                <Typography.Link
                  onClick={() => save(record?.PromotionID || "")}
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
      onCell: (record: Promotion) => ({
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

  const changePromotion = async (promotion: Promotion) => {
    try {
      const result = await UpdatePromotion(promotion);
      if (result) return result?.data;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleAddPromotion = async (promotion: Promotion) => {
    try {
      const result = await AddPromotion(promotion);
      if (result) return result?.data;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const clearThePromotion = async (promotionId: number) => {
    if (!promotionId) return null;

    try {
      const result = await DeletePromotionById(promotionId);
      if (result) return result?.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Promotion;
      const newData = [...promotions];
      const index = newData.findIndex((item) => key === item.PromotionID);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = changePromotion(newTourType);
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setPromotions(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setPromotions(newData);
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
    const result = await clearThePromotion(key);
    const newData = tourTypes.filter((item: TourType) => item.TourTypeId !== key);
    setTourTypes(newData);
  };

  const handleAdd = async (promotion: Promotion) => {
    const result = await handleAddPromotion(promotion);
    setPromotions([{ ...promotion, PromotionID: promotions.length + 1 }, ...promotions]);
  };

  const edit = (record: Promotion, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.PromotionID?.toString() || "");
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

  return promotions ? (
    <Form form={form} component={false}>
      <AddRecord
        Save={handleAdd}
        Form={form}
        TourTypes={tourTypes}
        Promotions={promotions}
      />
      <Table
        columns={mergedColumns}
        dataSource={promotions}
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

export default ManagerPromotion;
