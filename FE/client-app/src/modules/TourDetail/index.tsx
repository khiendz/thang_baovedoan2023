import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import the useRouter
import {
  getTourTypeById,
  getCollectionImageByTourTypeId,
  AddTour,
} from "services";
import { Hotel, Promotion, RoomType, Tour, TourType } from "Models";
import { CollectionImage } from "Models/CollectionImage";
import { calRankRating, checkStateRating, stateRating } from "utils";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { InputNumber, Select } from "antd";
import Slides from "modules/Slides";
import AcceptOrder from "modules/AcceptOrder";
import format from "date-fns/format";
import { useAppContext } from "hook/use-app-context";
import { getAllHotel } from "services/hotel-service";
import { getAllRoomType } from "services/room-type-service";

export default function TourDetail() {
  const { setData: setPopup } = useAppContext("popup-message");
  const { data: tour, setData: setTour } = useAppContext("tour");
  const { data: tourType, setData: setTourTypeData } =
    useAppContext("tour-type");
  const { data: hotels, setData: setHotels } = useAppContext("hotels");
  const { data: roomTypes, setData: setRoomTypes } = useAppContext("rooms");

  const router = useRouter();
  const [stateRate, setStateRating] = useState<string>(stateRating.Normal);
  const { id } = router.query;
  const [tourTypes, setTourType] = useState<TourType>(new TourType());
  const [orderAccept, setOrrderAccept] = useState(false);

  useEffect(() => {
    setHotels([]);
    setRoomTypes([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  useEffect(() => {
    initData();
  }, [id]);

  useEffect(() => {
    if (tourTypes) {
      console.log(tourTypes);
      setTourTypeData(tourTypes);
      let tourInit = new Tour();
      tourInit.TotalChd = 0;
      tourInit.TotalElder = 0;
      tourInit.TourName = tourTypes.Name;
      tourInit.StartDate = tourTypes.StartDate;
      tourInit.EndDate = tourTypes.EndDate;
      tourInit.Location = tourTypes.Description;
      tourInit.TotalMember = 0;
      tourInit.TotalChd = 0;
      tourInit.TotalElder = 0;
      tourInit.PriceTotal = 0;
      tourInit.TourTypeId = tourTypes.TourTypeId;
      tourInit.RoomTypeId = 1;
      tourInit.Img = tourTypes.Img;
      tourInit.RoomStartDate = tourTypes.StartDate;
      tourInit.RoomEndDate = tourTypes.EndDate;
      setTour(tourInit);
    }
  }, [tourTypes]);

  const initData = () => {
    initTourType();
    initHotels();
    initRoomTypes();
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
      const idParam = parseInt(id.toString());
      const rest = await getCollectionImageByTourTypeId(idParam);
      if (rest) {
        const data: CollectionImage[] = rest;
        return data;
      }
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
  };
  
  const initHotels = async () => {
    if (id === null || id === undefined) return;
    try {
      const rest = await getAllHotel();
      if (rest) {
        setHotels(rest.data);
      }
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
  };

  const initRoomTypes = async () => {
    if (id === null || id === undefined) return;
    try {
      const rest = await getAllRoomType();
      if (rest) {
        setRoomTypes(rest.data);
      }
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
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
        setPopup({
          title: "Thất bại",
          messagePopup: "Vui lòng kiểm tra lại thông tin",
          state: true,
        });
        setOrrderAccept(false);
        return;
      }

      initTourType();
      setPopup({
        title: result.status == 200 ? "Thành công" : "Thất bại",
        messagePopup: result?.message
          ? result?.message
          : "Vui lòng chờ nhân viên liên hệ",
        state: result.status == 200,
      });
      onChangeTotalChildren(0);
      onChangeTotalElder(0);
      setOrrderAccept(false);
    } catch (e) {
      setPopup({
        title: "Thất bại",
        messagePopup: "Vui lòng kiểm tra lại thông tin",
        state: true,
      });
      setOrrderAccept(false);
    }
  };

  return tour && tourType ? (
    <>
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

            <p>Số lượng người còn trống: {tourType?.MaxSlot}</p>
            <p
              className={`${
                (tourTypes.OrderSlot || 0) >= (tourTypes.MaxSlot || 0)
                  ? "dk-p-3 dk-bg-red-500 dk-w-fit dk-rounded-xl dk-text-[#FFF] dk-font-Roboto dk-text-lg"
                  : ""
              }`}
            >
              Số lượng người đã đặt: {tourType?.OrderSlot} {(tourTypes.OrderSlot || 0) >= (tourTypes.MaxSlot || 0) ? "- Số lượng người đặt tour đã đạt tối đa" : ""}
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
            <Select
            className="dk-w-full dk-h-fit"
            defaultValue={
              { value: "1", label: "Tự đăng ký khách sạn"}
            }
            options={[
              ...hotels?.map((ob: Hotel) => {
                return { value: 
                  ob.HotelId, 
                  label: (
                  <div className="dk-font-Inter dk-text-sm dk-font-semibold dk-flex dk-flex-col dk-h-fit dk-p-2">
                  <span className="dk-font-Roboto dk-font-bold">
                    Tên khách sạn:{" "}
                    <span className="dk-font-normal">{ob?.Name}</span>
                  </span>
                  <span className="dk-font-Roboto dk-font-bold">
                    Số sao: <span className="dk-font-normal">{ob.StarRating}</span>
                  </span>
                  <span className="dk-font-Roboto dk-font-bold">
                    Miêu tả: <span className="dk-font-normal">{ob.Description}</span>
                  </span>
                  <span className="dk-font-Roboto dk-font-bold">
                    Địa chỉ: <span className="dk-font-normal">{ob.Address}</span>
                  </span>
                  <span className="dk-font-Roboto dk-font-bold">
                    Địa chỉ email: <span className="dk-font-normal">{ob.Email}</span>
                  </span>
                </div> ),
                  ob: ob };
              }),
            ]}
            onChange={(value) => {
              setTour({...tour,HotelId: value})
            }}
          />
          {
            tour?.HotelId ? (
            <Select
            placeholder="Chọn phòng của khách sạn"
            className="dk-w-full dk-h-fit"
            options={[
              ...roomTypes?.map((ob: RoomType) => {
                return { value: 
                  ob.RoomTypeId, 
                  label: (
                  <div className="dk-font-Inter dk-text-sm dk-font-semibold dk-flex dk-flex-col dk-h-fit dk-p-2">
                  <span className="dk-font-Roboto dk-font-bold">
                    Tên phòng:{" "}
                    <span className="dk-font-normal">{ob?.Name}</span>
                  </span>
                  <span className="dk-font-Roboto dk-font-bold">
                    Tối đa số người: <span className="dk-font-normal">{ob.MaxOccupancy}</span>
                  </span>
                  <span className="dk-font-Roboto dk-font-bold">
                    Giá phòng: <span className="dk-font-normal">{ob.Price}</span>
                  </span>
                  <span className="dk-font-Roboto dk-font-bold">
                    Phí trễ phòng: <span className="dk-font-normal">{ob.KateFee}</span>
                  </span>
                </div> ),
                  ob: ob };
              }),
            ]}
            onChange={(value) => {
              setTour({...tour,RoomTypeId: value})
            }}
          />) : null
          }
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
                  tour?.TotalChd * (tourTypes?.PriceChildren || 0) +
                  tour?.TotalElder * (tourTypes?.PriceElder || 0)
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
                    title: "Kiểm tra lại số lượng người lớn",
                    messagePopup: "Số lượng người lớn phải lớn hơn 0",
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
