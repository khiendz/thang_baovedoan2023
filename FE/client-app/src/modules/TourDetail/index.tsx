import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import the useRouter
import {
  getTourTypeById,
  getCollectionImageByTourTypeId,
  AddTour,
} from "services";
import { Promotion, Tour, TourType } from "Models";
import { CollectImg } from "Models/CollectionImage";
import { calRankRating, checkStateRating, stateRating } from "utils";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import Slides from "modules/Slides";
import AcceptOrder from "modules/AcceptOrder";
import format from "date-fns/format";
import { useAppContext } from "hook/use-app-context";
import { getAllHotel } from "services/hotel-service";
import { getAllRoomType } from "services/room-type-service";
import { UserOutlined } from "@ant-design/icons";
import { initTour } from "./service";
import { SelectHotel } from "./components/SelectHotel";
import { SelectRoom } from "./components/SelectRoom";
import { checkPayment } from "utils/crypto";
import { DeletePaymentByOrderCode } from "services/payment-service";

export default function TourDetail() {
  const { setData: setPopup } = useAppContext("popup-message"),
    { data: tour, setData: setTour } = useAppContext("tour"),
    { data: tourType, setData: setTourTypeData } = useAppContext("tour-type"),
    { setData: setHotels } = useAppContext("hotels"),
    { setData: setRoomTypes } = useAppContext("room-types"),
    router = useRouter(),
    [stateRate, setStateRating] = useState<string>(stateRating.Normal),
    { idTour, id, status, cancel } = router.query,
    [tourTypes, setTourType] = useState<TourType>(new TourType()),
    [orderAccept, setOrrderAccept] = useState(false);

  useEffect(() => {
    initData();
    setHotels([]);
    setRoomTypes([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, [idTour]);

  useEffect(() => {
    if (tourTypes) {
      setTourTypeData(tourTypes);
      const tourInit = initTour(tourTypes);
      setTour(tourInit);
    }
  }, [tourTypes]);

  useEffect(() => {
    if (!status) return;
    checkPaymentById(id?.toString() || "");
  }, [status]);

  const checkPaymentById = async (id: string) => {
    const checkPaymentResult = await checkPayment(id);
    const { orderCode, status } = checkPaymentResult?.data?.data;
    if (orderCode && status && status == "CANCELLED") {
      handlePopup(false, "Thanh toán không thành công");
      const result = await DeletePaymentByOrderCode(orderCode);
      return;
    }
    handlePopup(
      true,
      "Thanh toán thành công, nhân viên sẽ sớm liên hệ với bạn trong ít phút"
    );
  };

  const initData = () => {
    initTourType();
    initHotels();
    initRoomTypes();
  };

  const initTourType = async () => {
    if (idTour === null || idTour === undefined) return;
    try {
      const idParam = parseInt(idTour.toString());
      const rest = await getTourTypeById(idParam);
      if (rest) {
        let data: TourType = rest;
        const collectImage: CollectImg[] = (await initCollectionImage()) || [];
        data.CollectImg = collectImage;
        setTourType(data);
        const pointRating = calRankRating([data?.RateTourType || 0]);
        const rating = checkStateRating(pointRating);
        setStateRating(rating);
      }
    } catch (e) {}
  };

  const initCollectionImage = async () => {
    if (idTour === null || idTour === undefined) return;
    try {
      const idParam = parseInt(idTour.toString());
      const rest = await getCollectionImageByTourTypeId(idParam);
      if (rest) {
        const data: CollectImg[] = rest;
        return data;
      }
    } catch (e) {}
  };

  const initHotels = async () => {
    try {
      const rest = await getAllHotel();
      if (rest) {
        setHotels(rest.data);
      }
    } catch (e) {}
  };

  const initRoomTypes = async () => {
    try {
      const rest = await getAllRoomType();
      if (rest) {
        setRoomTypes(rest.data);
      }
    } catch (e) {}
  };

  const onChangeTotalElder = (value: any) => {
    setTour({
      ...tour,
      TotalElder: parseInt(value),
    });
  };

  const onChangeTotalChildren = (value: any) => {
    setTour({
      ...tour,
      TotalChd: parseInt(value),
    });
  };

  const save = async (tour: Tour) => {
    try {
      const result = await AddTour(tour);

      if (!result) {
        handlePopup(false, "Vui lòng kiểm tra lại thông tin");
        return result;
      }

      initData();
      const isSuccess = result.status == 200;
      onChangeTotalChildren(0);
      onChangeTotalElder(0);
      setOrrderAccept(false);

      return result;
    } catch (e) {
      handlePopup(false, "Vui lòng kiểm tra lại thông tin");
      setOrrderAccept(false);
    }
  };

  const handlePopup = (isSuccess: boolean, message: string) => {
    setPopup({
      title: isSuccess ? "Thành công" : "Thất bại",
      messagePopup: message,
      state: isSuccess,
    });
  };

  return idTour && tour && tourType ? (
    <>
      <div className="dk-text-[#222] dk-font-Inter content-container content-miss dk-flex dk-flex-col dk-gap-2 dk-relative dk-z-10 dk-mb-5">
        <h1 className="dk-text-[#003c71] dk-font-semibold dk-text-4xl dk-w-full dk-bg-white dk-rounded-lg dk-p-4">
          {tourTypes?.Name}
        </h1>
        <div className="rate dk-flex dk-gap-2 dk-items-center">
          <span className="dk-font-Inter dk-font-bold dk-text-green-400">
            Rating {tourTypes.RateTourType} ⭐ - Trải Ngiệm
          </span>
          <span className="dk-font-Inter dk-font-bold dk-text-green-400">
            {stateRate}
          </span>
        </div>
        <div className="dk-flex dk-justify-between">
          {tourTypes.CollectImg && tourTypes.CollectImg.length > 0 ? (
            <div className="card-listing dk-flex dk-flex-wrap dk-gap-12 dk-justify-center dk-mt-8 dk-relative dk-max-w-full">
              <Slides data={tourTypes?.CollectImg || []} />
            </div>
          ) : null}
          <div className="dk-bg-white dk-rounded-lg dk-p-4 dk-w-full dk-mt-8 dk-flex dk-gap-2 dk-flex-col dk-border-l-8 dk-border-l-blue-800">
            <p className="dk-text-[20px] dk-font-bold dk-text-[#003c71] dk-font-Inter">
              Lịch khởi hành & giá
            </p>

            <p>
              <span className="dk-font-bold dk-text-lg dk-font-Inter">
                Dịch vụ tour du lịch dành cho :{" "}
              </span>
              {tourType?.MaxSlot} người <UserOutlined />
            </p>
            <p
              className={`${
                (tourTypes.OrderSlot || 0) >= (tourTypes.MaxSlot || 0)
                  ? "dk-p-3 dk-bg-red-500 dk-w-fit dk-rounded-xl dk-text-[#FFF] dk-font-Roboto "
                  : ""
              } dk-text-lg`}
            >
              <span className="dk-font-bold dk-text-lg dk-font-Inter">
                Số lượng người đã đặt :{" "}
              </span>
              {tourType?.OrderSlot} <UserOutlined />
              {(tourTypes.OrderSlot || 0) >= (tourTypes.MaxSlot || 0)
                ? "- Số lượng người đặt tour đã đạt tối đa"
                : ""}
            </p>
            <div className="dk-font-bold dk-text-sm dk-flex dk-gap-2 dk-items-center">
              <div>
                <span className="dk-text-sm dk-font-bold">Giá người lớn: </span>
                {tourTypes.PriceElder?.toLocaleString("vi-VN")} VND
              </div>
              <InputNumber
                min={0}
                max={99}
                value={tour.TotalElder}
                defaultValue={(tour as Tour)?.TotalElder || 0}
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
                value={tour?.TotalChd}
                defaultValue={(tour as Tour)?.TotalChd || 0}
                onChange={(e) => onChangeTotalChildren(e)}
              />
            </div>
            <SelectHotel />
            {tour?.HotelId && tour.HotelId != 0 ? <SelectRoom /> : null}
            {tourType?.Promotion?.length > 0 &&
            tourType?.Promotion[0]?.Description ? (
              <div className="dk-flex dk-gap-2">
                <div className="dk-text-sm dk-font-Inter dk-font-medium">
                  <div
                    className="schedule dk-flex dk-flex-col dk-gap-4 dk-bg-white dk-p-4 dk-rounded-lg"
                    dangerouslySetInnerHTML={{
                      __html: tourType?.Promotion[0].Description
                        ? tourType?.Promotion[0].Description
                        : "",
                    }}
                  ></div>
                </div>
              </div>
            ) : null}
            {tourType && tourType.Promotion?.length > 0 && tourType?.Promotion[0]?.Discount &&
            tour.TotalElder > 0 ? (
              <span className="dk-p-1 dk-w-fit dk-bg-red-600 dk-rounded-md dk-text-[#FFF]">
                Đã áp dụng giảm giá vào tổng hóa đơn
              </span>
            ) : null}
            <div className="dk-flex dk-gap-2">
              <QuestionCircleOutlined />
              <p className="dk-text-sm dk-font-Inter dk-font-medium">
                Liên hệ xác nhận đặt chỗ
              </p>
            </div>
            <div className="total-price dk-flex dk-flex-col dk-gap-2">
              <span className="dk-text-xl dk-font-Roboto dk-font-medium dk-text-black">
                Tổng giá:{" "}
                {(
                  tour?.TotalChd * (tourTypes?.PriceChildren || 0) +
                  tour?.TotalElder * (tourTypes?.PriceElder || 0) -
                  ((tour?.TotalChd * (tourTypes?.PriceChildren || 0) +
                    tour?.TotalElder * (tourTypes?.PriceElder || 0)) /
                    100) *
                    (tourType && tourType.Promotion?.length > 0 && tourType?.Promotion[0]?.Discount ? 
                      ((tourType as TourType)?.Promotion[0]?.Discount || 1) : 1)
                ).toLocaleString("vi-VN")}{" "}
                VND
              </span>
            </div>
            <button
              className="dk-text-[18px] dk-p-4 dk-bg-orange-400 dk-text-white 
              dk-font-bold dk-w-fit dk-rounded-lg dk-mx-auto dk-mt-0"
              onClick={() => {
                if ((tourTypes.OrderSlot || 0) >= (tourTypes.MaxSlot || 0)) {
                  setPopup({
                    title: "Đã đầy số lượng người đặt tour",
                    messagePopup:
                      "Vui lòng tìm kiếm tour khác hoặc liên hệ với nhân viên qua hotline",
                    state: false,
                  });
                  return;
                }

                if (tour.TotalElder <= 0) {
                  setPopup({
                    title: "Có vẻ quý khách chưa chọn số lượng người lớn",
                    messagePopup: "Vui lòng thử lại",
                    state: false,
                  });
                  return;
                }

                setOrrderAccept(!orderAccept);
              }}
            >
              Yêu cầu đặt
            </button>
          </div>
        </div>
        <div
          className="schedule dk-flex dk-flex-col dk-gap-4 dk-bg-white dk-p-4 dk-rounded-lg"
          dangerouslySetInnerHTML={{
            __html: tourTypes.Description ? tourTypes.Description : "",
          }}
        ></div>
        {(tourTypes?.Promotion?.length || 0) > 0
          ? tourTypes?.Promotion?.map((promotion: Promotion, index) => {
              return (
                <div
                  key={index}
                  className="schedule dk-flex dk-flex-col dk-gap-4 dk-bg-white dk-p-4 dk-rounded-lg"
                  dangerouslySetInnerHTML={{
                    __html: promotion.Description ? promotion.Description : "",
                  }}
                ></div>
              );
            })
          : null}
        <div className="dk-flex dk-flex-col dk-gap-4 dk-bg-white dk-p-4 dk-rounded-lg">
          <p className="dk-font-Roboto dk-text-lg dk-font-medium">
            <span className="dk-font-semibold">Ngày khởi hành: </span>
            {format(
              tourTypes.StartDate ? new Date(tourTypes.StartDate) : new Date(),
              "dd-MM-yyyy"
            )}
          </p>
          <p className="dk-font-Roboto dk-text-lg dk-font-medium">
            <span className="dk-font-semibold">Ngày về: </span>
            {format(
              tourTypes.EndDate ? new Date(tourTypes.EndDate) : new Date(),
              "dd-MM-yyyy"
            )}
          </p>
        </div>
      </div>
      {orderAccept ? (
        <AcceptOrder
          tour={tour}
          setTour={setTour}
          setOrder={setOrrderAccept}
          keyData={"tour"}
          save={(tour: Tour) => save(tour)}
        />
      ) : null}
    </>
  ) : null;
}
