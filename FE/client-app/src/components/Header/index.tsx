"use client";
import React, { useState } from "react";
import { SearchOutlined, NotificationOutlined } from "@ant-design/icons";
import { getData } from "services/test.service";
import { Roboto } from "next/font/google";
import UserAccount from "modules/UserAccount";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  return (
    <header className="dk-flex dk-flex-row dk-bg-[#003C71] dk-h-16 dk-text-[#FFF] dk-gap-14 dk-justify-between dk-items-center dk-font-Inter">
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
        <span className="dk-z-2 dk-absolute dk-bg-red-600 dk-w-[25px] dk-h-[25px] 
        dk-rounded-[50%] dk-text-center dk-align-middle dk-left-0 dk-top-2">9</span>
        <NotificationOutlined className="dk-relative dk-z-1"/>
      </div>
      <UserAccount />
    </header>
  );
}
