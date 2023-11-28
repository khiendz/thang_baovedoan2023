"use client";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Roboto } from "next/font/google";
import UserAccount from "modules/UserAccount";
import Notification from "components/Notification";
import { userService } from "services";
import NotifYPopup from "components/NotifyPopup";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  return userService.userValue ? (
    <header className={`dk-flex dk-flex-row dk-bg-[#003C71] dk-h-16 dk-text-[#FFF] dk-gap-14 dk-justify-between dk-items-center dk-font-Inter`} >
      <span className="dk-pl-8 dk-whitespace-nowrap">Thắng tour</span>
      <div className="search dk-flex dk-flex-row dk-gap-6 dk-pr-[600px]">
        <input
          type="text"
          id="site-search"
          placeholder="Tìm kiếm tour du lịch"
          className={`${roboto.className} dk-border-[1px] dk-sha dk-rounded-lg dk-h-7 dk-w-96 
        focus:dk-outline-none dk-pl-[25px] dk-text-sm dk-appearance-none dk-pr-[25px] dk-shadow-md`}
        />
        <button>
          <SearchOutlined />
        </button>
      </div>
      <div className="dk-relative dk-h-full dk-w-fit dk-flex dk-justify-center dk-items-center">
        <Notification />
      </div>
      <UserAccount />
      <NotifYPopup></NotifYPopup>
    </header>
  ) : (
    <header className="dk-hidden">
      <UserAccount />
    </header>
  );
}
