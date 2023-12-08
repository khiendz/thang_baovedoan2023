import React from "react";
import { Card } from "antd";
import { TourType } from "Models";
import { JoinFileCDN } from "services";
import "./style.scss";

const { Meta } = Card;

const TourCard: React.FC<any> = (props: any) => {
  const {className} = props;
  const data = props.data;
  return props.data ? (
    <a href={`/tour-detail/${data?.TourTypeId}`} className={`hover:dk-cursor-pointer hover:dk-scale-[1.2]
     hover:dk-transition-[transform_0.3s_ease] dk-shadow-xl dk-min-h-fit dk-h-[465px] ${className ? className : ""}`}>
      <Card
        style={{ width: 300 }}
        className="dk-min-h-[400px]"
        cover={<img alt="example" src={JoinFileCDN(data?.Img || "")} className="dk-w-[250px] dk-aspect-[3/2]" />}
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
