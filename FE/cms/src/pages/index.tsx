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
import { getTourByRegion, typeRegion } from "services";
import { removeAccents } from "utils/charactor-util";
import ManagerTour from "modules/ManagerTour";
import ManagerTourType from "modules/ManagerTour";

export default function Home() {
  const [tourTypesList, setTourTypeList] = useState<TourType[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [timeoutId,setTimeoutId] = useState<string>("");
  const timeoutIdRef = useRef(timeoutId);
  timeoutIdRef.current = timeoutId;
  const [searchingData,setSeachingData] = useState<TourType[]>([]);
  const searchInputRef = useRef(searchInput);
  searchInputRef.current = searchInput;
  
  useEffect(() => {
    const initData = async () => {
      try {
        const rest = await getTourByRegion(typeRegion.global);
        if (rest) {
          const data: TourType[] = rest;
          setTourTypeList(data);
        }
      } catch (e) {
        // Xử lý lỗi nếu cần
      }
    };

    initData();
  }, []); 

  useEffect(() => {
   if (tourTypesList) {
   }
  }, [tourTypesList]);

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
        <ManagerTourType/>
      </div>
    </LayoutDefault>
  );
}
