"use client";
import React from "react";
import UserAccount from "modules/UserAccount";
import NotifYPopup from "components/NotifyPopup";
import { useAppContext } from "hook/use-app-context";

export default function Header() {
  const { data: user } = useAppContext("user");

  return (
    <header className={`dk-flex dk-flex-row dk-bg-[#003C71] dk-h-16 dk-text-[#FFF] dk-gap-14 dk-justify-between dk-items-center dk-font-Inter
    ${user ? "" : "dk-hidden"}`} >
      <span className="dk-pl-8 dk-whitespace-nowrap">Thắng tour</span>
      <UserAccount />
      <NotifYPopup></NotifYPopup>
    </header>
  ) 
}
