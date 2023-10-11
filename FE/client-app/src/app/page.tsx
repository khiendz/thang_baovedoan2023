"use client";
import LayoutDefault from "components/layouts/LayoutDefault";
import React from "react";
import {
  QuestionCircleOutlined,
  SecurityScanOutlined,
  PhoneOutlined,
  GlobalOutlined,
  DollarOutlined
} from "@ant-design/icons";
import TourCard from "components/TourCard/indext";
type Props = {
  img: string,
  buzz: number[]
};


export default function Home() {
  return (
    <LayoutDefault>
      <div className="content-container content-miss dk-flex dk-flex-col dk-font-Roboto dk-gap-4 dk-relative dk-z-10">
        <h1 className="dk-text-[#FFF] dk-font-bold dk-text-2xl dk-relative dk-z-[2]">
          TRẢI NGHIỆM KỲ NGHỈ TUYỆT VỜI
        </h1>
        <h2 className="dk-font-medium dk-text-xs dk-text-[#FFF]">
          Combo khách sạn - vé máy bay - đưa đón sân bay giá tốt nhất
        </h2>
        <div className="search-form dk-flex dk-flex-col dk-h-fit dk-min-h-[220px] dk-w-fit dk-min-w-[760px] dk-p-4 dk-rounded dk-shadow-sm dk-mt-4 content-miss content-miss-v2 dk-gap-5 dk-relative dk-z-10">
          <div className="field">
            <QuestionCircleOutlined className="dk-absolute dk-left-6 dk-top-8 dk-z-[3] dk-text-[#222]" />
            <input
              className="field dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-8 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed"
              placeholder="Bạn muốn đi đâu ?"
            />
          </div>
          <div className="select dk-flex dk-flex-row dk-gap-4 dk-relative dk-z-10">
            <div className="select-date dk-flex dk-gap-4">
              <div className="dk-flex dk-flex-col dk-whitespace-nowrap dk-flex-nowrap dk-items-center dk-gap-2 dk-relative dk-z-10">
                <label
                  htmlFor={"dateFromTo"}
                  className="dk-text-[#fff] dk-font-medium dk-text-sm dk-text-center dk-w-full dk-flex dk-justify-start dk-relative dk-z-10"
                >
                  Ngày khởi hành
                </label>
                <input
                  type="date"
                  name="dateFromTo"
                  className="dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-8 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed dk-max-w-[200px]"
                />
              </div>
              <div className="dk-flex dk-flex-col dk-whitespace-nowrap dk-flex-nowrap dk-items-center dk-gap-2">
                <label
                  htmlFor={"dateFromTo"}
                  className="dk-text-[#fff] dk-font-medium dk-text-sm dk-text-center dk-w-full dk-flex dk-justify-start dk-relative dk-z-10"
                >
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  name="dateFromTo"
                  className="dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-8 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed dk-max-w-[200px]"
                />
              </div>
            </div>
            <div className="description select-date dk-flex dk-gap-4 dk-relative dk-z-10">
              <div className="dk-flex dk-flex-col dk-whitespace-nowrap dk-flex-nowrap dk-items-center dk-gap-2">
                <label
                  htmlFor={"oldPeople"}
                  className="dk-text-[#fff] dk-font-medium dk-text-sm dk-text-center dk-w-full dk-flex dk-justify-start"
                >
                  Số người lớn
                </label>
                <input
                  type="number"
                  name="oldPeople"
                  placeholder="Nhập số lượng"
                  className="dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-4 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed dk-max-w-[150px]"
                />
              </div>
              <div className="dk-flex dk-flex-col dk-whitespace-nowrap dk-flex-nowrap dk-items-center dk-gap-2 dk-relative dk-z-10">
                <label
                  htmlFor={"youngPeople"}
                  className="dk-text-[#fff] dk-font-medium dk-text-sm dk-text-center dk-w-full dk-flex dk-justify-start"
                >
                  Số trẻ em
                </label>
                <input
                  type="number"
                  name="youngPeople"
                  placeholder="Nhập số lượng"
                  className="dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-4 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed dk-max-w-[150px]"
                />
              </div>
            </div>
          </div>
          <div className="dk-w-full dk-flex dk-items-center dk-justify-center dk-relative dk-z-10">
            <button className="dk-p-4 dk-flex dk-gap-4 dk-bg-[#F79321] dk-text-sm dk-font-bold dk-font-Roboto dk-rounded dk-text-[#FFf]">
              <SecurityScanOutlined />
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>
        <div className="search-form dk-flex dk-flex-col dk-h-fit dk-min-h-[220px] dk-w-fit dk-min-w-[760px] dk-p-4 dk-rounded dk-shadow-sm dk-mt-4 content-miss content-miss-v2 dk-gap-5 dk-relative dk-z-10">
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
        </div>
        <div className="contact dk-flex dk-justify-between dk-text-sm dk-relative dk-z-10">
          <div className="contact-items dk-bg-white dk-text-lg dk-rounded-lg dk-p-4 dk-text-[#222] dk-font-Inter dk-font-semibold dk-flex dk-flex-nowrap dk-gap-5">
            <PhoneOutlined />
            <p>Hỗ trợ chuyên viên</p>
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
      </div>
      <div className="dk-text-[#222] dk-font-Inter content-container content-miss content-base dk-flex dk-flex-col dk-font-Roboto dk-gap-2 dk-relative dk-z-10 dk-mb-5 dk-flex dk-flex-col">
        <h2 className="dk-text-[#222] dk-font-semibold dk-text-lg">Tours du lịch mùa đông</h2>
        <p className="dk-text-[#888] dk-font-semibold dk-text-sm">Trải nghiệm du lịch đặc biệt</p>
        <div className="card-listing dk-flex dk-flex-wrap dk-gap-5 dk-justify-center dk-mt-5">
          <TourCard img={"https://cdn2.ivivu.com/2019/10/01/10/ivivu-cuu-trai-cau5-360x225.jpg"} title={"Tour Trung Quốc 7N6Đ: Thành Đô - Trùng Khánh - Cửu Trại Câu - Đô Giang Yển"}/>
          <TourCard img={"https://cdn2.ivivu.com/2022/06/08/09/ivivu-thu-han-quoc-360x225.gif"} title={"Tour Hàn Quốc 5N4Đ: Đảo Nami - Seoul - Everland Mùa Thu"}/>
          <TourCard img={"https://cdn2.ivivu.com/2023/08/22/15/ivivu-song-hozu-arashiyama-bia-nhat-ban-360x225.jpg"} title={"Tour Nhật Bản 5N5Đ: Mùa Thu Cung Đường Vàng Osaka - Kyoto - Yamanashi - Tokyo"}/>
          <TourCard img={"https://cdn2.ivivu.com/2022/09/13/15/ivivu-mua-thu-chau-au-360x225.gif"} title={"Tour Châu Âu 9N8Đ: Đức - Hà Lan - Bỉ - Pháp - Thụy Sỹ - Bay Thẳng VNA"}/>
          <TourCard img={"https://cdn2.ivivu.com/2017/08/11/14/nui-phu-si-mua-la-do-360x225.jpg"} title={"Tour Châu Âu 9N8Đ: Hà Nội - Đức - Hà Lan - Bỉ - Pháp"}/>
          <TourCard img={"https://cdn2.ivivu.com/2018/09/14/10/ivivu-toa-thap-doi-twin-towers--360x225.jpg"} title={"Tour Nhật Bản 6N5Đ: Hà Nội - Osaka - Kobe - Kyoto - Phú Sĩ - Tokyo -  Mùa Thu Nhật Bản"}/>
          <TourCard img={"https://cdn2.ivivu.com/2019/01/11/17/chua-trang-wat-rong-khun-chiangrai-360x225.jpg"} title={"Tour Liên Tuyến Ba Nước 6N5Đ: Singapore - Indonesia - Malaysia"}/>
          <TourCard img={"//cdn2.ivivu.com/2019/01/11/17/chua-trang-wat-rong-khun-chiangrai-360x225.jpg"} title={"Tour Thái Lan 4N3Đ: Chiang Mai - Chiang Rai - Tam Giác Vàng"}/>
        </div>
      </div>
    </LayoutDefault>
  );
}
