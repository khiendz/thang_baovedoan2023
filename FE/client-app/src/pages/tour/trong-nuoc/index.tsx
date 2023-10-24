'use client'
import React, {useEffect} from "react";
import TourForm from "components/Form/Formix/TourForm/TourForm";
import LayoutDefault from "components/layouts/LayoutDefault";
import TourCard from "components/TourCard/indext";
import { getTourById } from "services/tour-services";
import { Tour } from "Models";

export default function LocalTour() {

  useEffect(() => {
    const initData = async () => {
      try {
        const rest = await getTourById("1");
        console.log(rest);
        debugger
      } catch (e) {
        // Xử lý lỗi nếu cần
      }
    };
  
    initData();
  }, []); // Thêm [] để chỉ chạy useEffect khi component được gắn kết

    return <LayoutDefault>
         <div className="dk-text-[#222] dk-font-Inter content-container content-miss dk-flex dk-flex-col dk-font-Roboto dk-gap-2 dk-relative dk-z-10 dk-mb-5 dk-flex dk-flex-col">
        <h2 className="dk-text-[#222] dk-font-semibold dk-text-lg">Tours du lịch mùa đông trong nước</h2>
        <div className="card-listing dk-flex dk-flex-wrap dk-gap-5 dk-justify-center dk-mt-5">
          <TourCard img={"https://cdn2.ivivu.com/2019/10/01/10/ivivu-cuu-trai-cau5-360x225.jpg"} title={"Tour Hà Nội"}/>
          <TourCard img={"https://cdn2.ivivu.com/2022/06/08/09/ivivu-thu-han-quoc-360x225.gif"} title={"Tour Phố Cổ"}/>
          <TourCard img={"https://cdn2.ivivu.com/2023/08/22/15/ivivu-song-hozu-arashiyama-bia-nhat-ban-360x225.jpg"} title={"Tour Hội An"}/>
          <TourCard img={"https://cdn2.ivivu.com/2022/09/13/15/ivivu-mua-thu-chau-au-360x225.gif"} title={"Tour Thăng Long"}/>
          <TourCard img={"https://cdn2.ivivu.com/2017/08/11/14/nui-phu-si-mua-la-do-360x225.jpg"} title={"Tour Đà Lạt"}/>
          <TourCard img={"https://cdn2.ivivu.com/2018/09/14/10/ivivu-toa-thap-doi-twin-towers--360x225.jpg"} title={"Tour Nhật Bản 6N5Đ: Hà Nội - Osaka - Kobe - Kyoto - Phú Sĩ - Tokyo -  Mùa Thu Nhật Bản"}/>
          <TourCard img={"https://cdn2.ivivu.com/2019/01/11/17/chua-trang-wat-rong-khun-chiangrai-360x225.jpg"} title={"Tour Liên Tuyến Ba Nước 6N5Đ: Singapore - Indonesia - Malaysia"}/>
          <TourCard img={"//cdn2.ivivu.com/2019/01/11/17/chua-trang-wat-rong-khun-chiangrai-360x225.jpg"} title={"Tour Thái Lan 4N3Đ: Chiang Mai - Chiang Rai - Tam Giác Vàng"}/>
        </div>
      </div>
    </LayoutDefault>
}