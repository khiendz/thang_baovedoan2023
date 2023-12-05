"use client";
import React, {useEffect} from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Roboto } from "next/font/google";
import UserAccount from "modules/UserAccount";
import Notification from "components/Notification";
import NotifYPopup from "components/NotifyPopup";
import { useAppContext } from "hook/use-app-context";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  const { data: user } = useAppContext("user");

  return (
    <header className={`dk-flex dk-flex-row dk-bg-[#003C71] dk-h-16 dk-text-[#FFF] dk-gap-14 dk-justify-between dk-items-center dk-font-Inter
    ${user ? "" : "dk-hidden"}`} >
      <span className="dk-pl-8 dk-whitespace-nowrap">Thắng tour</span>
      <div className="dk-relative dk-h-full dk-w-fit dk-flex dk-justify-center dk-items-center">
        <Notification />
      </div>
      <UserAccount />
      <NotifYPopup></NotifYPopup>
    </header>
  ) 
}
