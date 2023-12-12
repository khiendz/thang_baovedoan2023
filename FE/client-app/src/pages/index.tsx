"use client";
import LayoutDefault from "components/layouts/LayoutDefault";
import React, { useState, useEffect, useRef } from "react";
import {
  QuestionCircleOutlined,
  SecurityScanOutlined,
  PhoneOutlined,
  GlobalOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { TourType } from "Models";
import TourCard from "components/TourCard/indext";
import { JoinFileCDN, getAllTouType, getTopTourType, getTourByRegion, typeRegion } from "services";
import { removeAccents } from "utils/charactor-util";
import Slides from "modules/Slides";
import {CheckOutlined,HighlightOutlined,ClockCircleOutlined} from "@ant-design/icons";

export default function Home() {
  const [tourTypesList, setTourTypeList] = useState<TourType[]>([]);
  const [tourTypeGlobal, setTourTypeGlobal] = useState<TourType[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [timeoutId,setTimeoutId] = useState<string>("");
  const [topTourType,setTopTour] = useState<TourType[]>([]);
  const timeoutIdRef = useRef(timeoutId);
  timeoutIdRef.current = timeoutId;
  const [searchingData,setSeachingData] = useState<TourType[]>([]);
  const searchInputRef = useRef(searchInput);
  searchInputRef.current = searchInput;
  
  useEffect(() => {
    const initData = async () => {
      try {
        const rest = await getAllTouType();
        if (rest) {
          const data: TourType[] = rest.data;
          setTourTypeList(data.reverse());
        }
        const restGlobal = await getTopTourType(1);
        if (rest) {
          const data: TourType[] = restGlobal;
          setTourTypeGlobal(data.reverse());
        }
        const restTopTourType = await getTopTourType(0);
        if (restTopTourType) {
          setTopTour(restTopTourType.reverse());
        }
      } catch (e) {
      }
    };

    initData();
  }, []); 

  useEffect(() => {
      clearTimeout(timeoutIdRef.current);

    if (searchInput != "") {
      clearTimeout(timeoutIdRef.current);
      const timeoutIdOb = setTimeout(() => { 
        searching();
      },1000);
      setTimeoutId(String(timeoutIdOb));
      timeoutIdRef.current = String(timeoutIdOb);
    }

    return () => {
      clearTimeout(timeoutIdRef.current || "");
    }
  }, [searchInput]);

  const searching = () => {
    if (searchInputRef.current) {
        const dataSearch = tourTypesList.filter(e => {
            const removeAccentOb = removeAccents(e.Name.toUpperCase());
            const removeAccentParam = removeAccents(searchInputRef.current.toUpperCase());
            const result = removeAccentOb.includes(removeAccentParam);
            return result;
          }
        );
        setSeachingData(dataSearch);
        console.log(dataSearch);
    }
  }
  
  const handleInput = (value:string) => {
    setSeachingData([]);
    clearTimeout(timeoutIdRef.current);
    setSearchInput(value);
  }

  return (
    <LayoutDefault>
      <div className="content-container content-miss dk-flex dk-flex-col dk-font-Roboto dk-gap-4 dk-relative dk-z-10">
        <h1 className="dk-text-[#FFF] dk-font-bold dk-text-2xl dk-relative dk-z-[2]">
          TRẢI NGHIỆM KỲ NGHỈ TUYỆT VỜI
        </h1>
        <h2 className="dk-font-medium dk-text-xs dk-text-[#FFF]">
          Combo khách sạn - vé máy bay - đưa đón sân bay giá tốt nhất
        </h2>
        <div className="search-form dk-flex dk-h-fit dk-min-h-[220px] dk-min-w-[50%] dk-w-[50%] dk-p-4 
        dk-rounded dk-shadow-sm dk-mt-4 content-miss content-miss-v2 dk-gap-5 dk-relative dk-z-20 dk-justify-between">
          <div className="field dk-relative dk-min-w-full">
            <QuestionCircleOutlined className="dk-absolute dk-left-2 dk-top-4 dk-z-[3] dk-text-[#222]" />
            <input
              className="field dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-8 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed"
              placeholder="Bạn muốn đi đâu ?"
              onChange={(e) => handleInput(e.target.value)}
            />
            {
              searchingData?.length > 0 ?
              <div className="search-return dk-absolute dk-min-w-fit dk-max-h-[450px] dk-bg-white dk-rounded-lg dk-p-4 dk-z-40 dk-top-16 dk-shadow-lg dk-w-full dk-overflow-auto scroll-custom">
                <ul className="dk-flex dk-flex-col dk-z-20 dk-relative dk-text-[#222] dk-text-sm dk-font-bold dk-max-h-full dk-overflow-hidden">
                  {
                    searchingData?.map((ele,index) => (
                      <li key={index} className="dk-h-100% dk-p-4 hover:dk-bg-blue-100 dk-border-b-[2px] dk-border-b-[#222]">
                        <a href={`/tour-detail/${ele.TourTypeId}`} className="dk-flex dk-justify-between dk-gap-8">
                          <div className="dk-line-clamp-7">
                            <p className="dk-font-Roboto dk-font-bold dk-text-lg">{ele.Name}</p>
                            <div dangerouslySetInnerHTML={{ __html: ele.Description ? ele.Description: "" }}></div>
                            </div>
                           <img src={JoinFileCDN(ele.Img || "")} className="dk-w-[150px] dk-h-[100px]"/>
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div> : 
              null
            }
          </div>
        </div>
        <div className="search-form dk-flex dk-flex-col dk-h-fit dk-min-h-[220px] dk-w-fit dk-min-w-[50%] dk-p-4 dk-rounded dk-shadow-sm dk-mt-4 content-miss content-miss-v2 dk-gap-5 dk-relative dk-z-10">
          <div className="dk-flex dk-gap-4">
            <h2 className="dk-text-[#FFF] dk-font-bold dk-text-2xl dk-relative dk-z-[14]">
              Combo tốt nhất hôm nay
            </h2>
            <div className="dk-flex dk-items-center dk-p-2 dk-bg-red-200 dk-text-red-500 dk-rounded-xl dk-relative dk-z-[14] dk-h-9 dk-text-sm">
              <img
                width="20"
                src="https://res.ivivu.com/hotel/img/fire-sale.svg"
              />
              498 khách đã đặt dịch vụ này
            </div>
          </div>
          <div className="card-listing dk-flex dk-flex-wrap dk-gap-5 dk-justify-center dk-mt-2 dt-pb-5">
          {tourTypeGlobal ? (
            <div className="card-listing dk-flex dk-flex-wrap dk-gap-12 dk-justify-center dk-mt-8 dk-relative">
              {tourTypeGlobal?.filter((ob: TourType) => ob?.Promotion?.length > 0)?.map((ele, index) => (
                <TourCard key={index} data={ele} className="blinking"/>
              ))}
            </div>
          ) : null}
        </div>
        </div>
        <div className="contact dk-flex dk-justify-between dk-text-sm dk-relative dk-z-10">
          <div className="contact-items dk-bg-white dk-text-lg dk-rounded-lg dk-p-4 dk-text-[#222] dk-font-Inter dk-font-semibold dk-flex dk-flex-nowrap dk-gap-5">
            <PhoneOutlined />
            <p>Hotline: 0382033515</p>
          </div>
          <div className="contact-items dk-bg-white dk-text-lg dk-rounded-lg dk-p-4 dk-text-[#222] dk-font-Inter dk-font-semibold dk-flex dk-flex-nowrap dk-gap-5">
            <GlobalOutlined />
            <p>Trải nghiệm đa dạng</p>
          </div>
          <div className="contact-items dk-bg-white dk-text-lg dk-rounded-lg dk-p-4 dk-text-[#222] dk-font-Inter dk-font-semibold dk-flex dk-flex-nowrap dk-gap-5">
            <DollarOutlined />
            <p>Thanh toán an toàn</p>
          </div>
        </div>
        <div className="dk-absolute dk-top-14 dk-right-8 dk-h-[50%] dk-w-[25%] content-miss dk-rounded-2xl dk-text-[#14274b] 
        dk-text-[34px] dk-font-semibold dk-flex dk-flex-col dk-justify-center dk-items-center dk-gap-5">
                <p>Trải nghiệm đa dạng <CheckOutlined /></p>
                <p>Du lịch theo sở thích <HighlightOutlined /></p>
                <p>Hỗ trợ 24/7 <ClockCircleOutlined /></p>
                <p>Hotline: 0381232515 <PhoneOutlined /></p>
        </div>
      </div>
      <div className="dk-text-[#222] content-container content-miss content-base dk-font-Roboto dk-gap-2 dk-relative dk-z-10 dk-mb-5 dk-flex dk-flex-col">
        <h2 className="dk-text-[#222] dk-font-bold dk-text-2xl">
          Tours du lịch nổi bật trong nước
        </h2>
        <p className="dk-text-[#888] dk-font-semibold dk-text-sm">
          Trải nghiệm du lịch đặc biệt
        </p>
        <div className="card-listing dk-flex dk-flex-wrap dk-gap-5 dk-justify-center dk-mt-5">
          {topTourType ? (
            <div className="card-listing dk-flex dk-flex-wrap dk-gap-12 dk-justify-center dk-mt-8 dk-relative">
              {topTourType?.map((ele, index) => (
                <TourCard key={index} data={ele} className="blinking"/>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="dk-text-[#222] content-container content-miss content-base dk-font-Roboto dk-gap-2 dk-relative dk-z-10 dk-mb-5 dk-flex dk-flex-col">
        <h2 className="dk-text-[#222] dk-font-bold dk-text-2xl">
          Tours du lịch nổi bật ngoài nước
        </h2>
        <p className="dk-text-[#888] dk-font-semibold dk-text-sm">
          Trải nghiệm du lịch đặc biệt
        </p>
        <div className="card-listing dk-flex dk-flex-wrap dk-gap-5 dk-justify-center dk-mt-5">
          {tourTypeGlobal ? (
            <div className="card-listing dk-flex dk-flex-wrap dk-gap-12 dk-justify-center dk-mt-8 dk-relative">
              {tourTypeGlobal?.map((ele, index) => (
                <TourCard key={index} data={ele} className="blinking"/>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </LayoutDefault>
  );
}
