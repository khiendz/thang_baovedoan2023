"use client";
import React, { useEffect, useState } from "react";
import LayoutDefault from "components/layouts/LayoutDefault";
import TourCard from "components/TourCard/indext";
import { getTourByRegion, typeRegion } from "services";
import { TourType } from "Models";

export default function LocalTour() {
  const [tourTypesList, setTourTypeList] = useState<TourType[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const rest = await getTourByRegion(typeRegion.global);
        if (rest) {
          const data: TourType[] = rest;
          setTourTypeList(data.reverse());
        }
      } catch (e) {
        // Xử lý lỗi nếu cần
      }
    };

    initData();
  }, []); // Thêm [] để chỉ chạy useEffect khi component được gắn kết

  return (
    <LayoutDefault>
      <div className="dk-text-[#222] dk-font-Inter content-container content-miss dk-flex dk-flex-col 
      dk-gap-2 dk-relative dk-z-10 dk-mb-5">
        <h2 className="dk-text-[#222] dk-font-semibold dk-text-lg">
          Tours du lịch nổi bật
        </h2>
        {tourTypesList ? (
          <div className="card-listing dk-flex dk-flex-wrap dk-gap-12 dk-justify-center dk-mt-8 dk-relative">
            {tourTypesList?.map((ele, index) => (
              <TourCard key={index} data={ele} />
            ))}
          </div>
        ) : null}
      </div>
    </LayoutDefault>
  );
}
