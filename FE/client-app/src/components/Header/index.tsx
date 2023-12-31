"use client";
import React from "react";
import UserAccount from "modules/UserAccount";
import NotifYPopup from "components/NotifyPopup";

export default function Header() {
  return (
    <header
      className={`dk-flex dk-flex-row dk-bg-[#003C71] dk-h-16 dk-text-[#FFF] dk-gap-14 dk-justify-between dk-items-center dk-font-Inter
   `}
    >
      <span className="dk-pl-8 dk-whitespace-nowrap dk-text-[24px] dk-font-semibold">Chào mừng bạn đã đến với Website đặt tour trực tuyến</span>
      <UserAccount />
      <NotifYPopup></NotifYPopup>
    </header>
  );
}
