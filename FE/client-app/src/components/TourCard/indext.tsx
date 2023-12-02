import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { TourType } from "Models";
import { JoinFileCDN } from "services";

const { Meta } = Card;

type Props = {
  data: TourType;
};

const TourCard: React.FC<Props> = (props: Props) => {
  const data = props.data;
  return props.data ? (
    <a href={`/tour-detail/${data?.TourTypeId}`} className="hover:dk-cursor-pointer hover:dk-scale-[1.2]
     hover:dk-transition-[transform_0.3s_ease] dk-shadow-xl dk-h-fit">
      <Card
        style={{ width: 300 }}
        className="dk-min-h-[400px]"
        cover={<img alt="example" src={JoinFileCDN(data?.Img || "")} />}
      >
        <Meta 
          className="dk-font-Inter dk-font-bold" 
          title={data?.Name} 
          description={<div
            className="dk-line-clamp-5"
            dangerouslySetInnerHTML={{ __html: data.Description ? data.Description : "" }}
          ></div>} 
          />
        <div className="dk-font-Inter dk-text-sm dk-font-semibold dk-text-[#222] dk-mt-5">
          <p>
            Giá tiền người lớn: <strong>{data?.PriceElder} VND</strong>
          </p>
          <p>
            Giá tiền trẻ em: <strong>{data?.PriceChildren} VND</strong>
          </p>
        </div>
      </Card>
    </a>
  ) : null;
};
export default TourCard;
