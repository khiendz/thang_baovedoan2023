import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import the useRouter
import LayoutDefault from "components/layouts/LayoutDefault";
import { getTourTypeById, getCollectionImageByTourTypeId } from "services";
import { Tour, TourType } from "Models";
import { CollectionImage } from "Models/CollectionImage";
import { calRankRating, checkStateRating, stateRating } from "utils";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import Slides from "modules/Slides";
import AcceptOrder from "modules/AcceptOrder";
import { useAppContext } from "hook/use-app-context";

export default function LocalTour() {
  const router = useRouter();
  const [stateRate, setStateRating] = useState<string>(stateRating.Normal);
  const { id } = router.query;
  const [tourTypes, setTourType] = useState<TourType>(new TourType());
  const [orderAccept,setOrrderAccept] = useState(false);
  const [tour, setTour] = useState<Tour>(new Tour());

  useEffect(() => {
    initData();
  }, [id]);

  const initData = () => {
    initTourType();
    let tourInit = new Tour();
    tourInit.TotalChd = 0;
    tourInit.TotalElder = 0;
    setTour(tourInit);
  };

  const initTourType = async () => {
    if (id === null || id === undefined) return;
    try {
      const idParam = parseInt(id.toString());
      const rest = await getTourTypeById(idParam);
      if (rest) {
        let data: TourType = rest;
        const collectImage: CollectionImage[] =
          (await initCollectionImage()) || [];
        data.CollectionImamge = collectImage;
        setTourType(data);
        const pointRating = calRankRating([data?.RateTourType || 0]);
        const rating = checkStateRating(pointRating);
        setStateRating(rating);
      }
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
  };

  const initCollectionImage = async () => {
    if (id === null || id === undefined) return;
    try {
      const idParam = parseInt(id[0]);
      const rest = await getCollectionImageByTourTypeId(idParam);
      if (rest) {
        const data: CollectionImage[] = rest;
        return data;
      }
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
  };

  const onChangeTotalElder = (value: any) => {
    setTour((prevTour: any) => ({
      ...prevTour,
      TotalElder: value,
    }));
  };

  const onChangeTotalChildren = (value: any) => {
    setTour((prevTour: any) => ({
      ...prevTour,
      TotalChd: value,
    }));
  };

  const onChangeDatePicker = (value: any,dateString: string) => {
    setTour((prevTour: any) => ({
      ...prevTour,
      StartDate: new Date(dateString),
    }));
  }

  return (
    <>
      <LayoutDefault>
        <div className="dk-text-[#222] dk-font-Inter content-container content-miss dk-flex dk-flex-col dk-gap-2 dk-relative dk-z-10 dk-mb-5">
          <h1 className="dk-text-[#222] dk-font-semibold dk-text-4xl">
            {tourTypes?.Name}
          </h1>
          <div className="rate dk-flex dk-gap-2 dk-items-center">
            <span className="dk-font-Inter dk-font-bold dk-text-red-500">
              Rating {tourTypes.RateTourType} ❤️ - Trải Ngiệm
            </span>
            <span className="dk-font-Inter dk-font-bold dk-text-red-500">
              {stateRate}
            </span>
          </div>
          <div className="dk-flex dk-justify-between">
            {tourTypes.CollectionImamge ? (
              <div className="card-listing dk-flex dk-flex-wrap dk-gap-12 dk-justify-center dk-mt-8 dk-relative dk-max-w-full">
                <Slides data={tourTypes.CollectionImamge || []} />
              </div>
            ) : null}
            <div className="dk-bg-white dk-rounded-lg dk-p-4 dk-w-full dk-mt-8 dk-flex dk-gap-2 dk-flex-col">
              <p className="dk-text-[20px] dk-font-bold dk-text-[#003c71] dk-font-Inter">
                Lịch khởi hành & giá
              </p>
              <p>Chọn ngày khởi hành:</p>
              <DatePicker className="dk-mt-3" onChange={(date,dateString) => {onChangeDatePicker(date,dateString)}}/>
              <div className="dk-font-bold dk-text-sm dk-flex dk-gap-2 dk-items-center">
                <div>
                  <span className="dk-text-sm dk-font-bold">
                    Giá người lớn:{" "}
                  </span>
                  {tourTypes.PriceElder?.toLocaleString("vi-VN")} VND
                </div>
                <InputNumber
                  min={0}
                  max={99}
                  defaultValue={1}
                  onChange={(e) => onChangeTotalElder(e)}
                />
              </div>
              <div className="dk-font-bold dk-text-sm dk-flex dk-gap-2 dk-items-center">
                <div>
                  <span className="dk-text-sm dk-font-bold">Giá trẻ em: </span>
                  {tourTypes.PriceChildren?.toLocaleString("vi-VN")} VND
                </div>
                <InputNumber
                  min={0}
                  max={99}
                  defaultValue={1}
                  onChange={(e) => onChangeTotalChildren(e)}
                />
              </div>
              <div className="dk-flex dk-gap-2">
                <QuestionCircleOutlined />
                <p className="dk-text-sm dk-font-Inter dk-font-medium">
                  Liên hệ xác nhận đặt chỗ
                </p>
              </div>
              <div className="total-price">
                <span className="dk-text-xl dk-font-Roboto dk-font-medium dk-text-yellow-400">
                  Tổng giá:{" "}
                  {(
                    tour?.TotalChd * (tourTypes.PriceChildren || 0) +
                    tour?.TotalElder * (tourTypes.PriceElder || 0)
                  ).toLocaleString("vi-VN")}{" "}
                  VND
                </span>
              </div>
              <button className="dk-text-[18px] dk-p-4 dk-bg-orange-400 dk-text-white 
              dk-font-bold dk-w-fit dk-rounded-lg dk-mx-auto dk-mt-0"
              onClick={() => {
                setOrrderAccept(!orderAccept);
              }}>
                Yêu cầu đặt
              </button>
            </div>
          </div>
          <div 
            className="schedule dk-flex dk-flex-col dk-gap-4 dk-bg-white dk-p-4 dk-rounded-lg"
            dangerouslySetInnerHTML={{ __html: tourTypes.Description ? tourTypes.Description : "" }}
          >
          </div>
        </div>
      </LayoutDefault>
      {
        orderAccept ? 
        <AcceptOrder tour={tour} setTour={setTour} setOrder={setOrrderAccept}/> : null
      }
    </>
  );
}
