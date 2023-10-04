"use client";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { getData } from "services/test.service";
import { Roboto } from "next/font/google";
import { LoadingOutlined } from "@ant-design/icons";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  return (
    <header className="dk-flex dk-flex-row dk-bg-[#fff] dk-h-12 dk-text-[#222] dk-gap-14 dk-justify-between dk-items-center">
      <span className="dk-pl-8 dk-whitespace-nowrap">Thắng tour</span>
      <div className="search dk-flex dk-flex-row dk-gap-6 dk-pr-[600px]">
        <input
          type="text"
          id="site-search"
          name="q"
          className={`${roboto.className} dk-border-[1px] dk-sha dk-rounded-lg dk-h-7 dk-w-96 
        focus:dk-outline-none dk-pl-[25px] dk-text-sm dk-appearance-none dk-pr-[25px] dk-shadow-md`}
        />
        <button>
          <SearchOutlined />
        </button>
      </div>
      <div className="dk-pr-28">
        <button className="dk-flex dk-flex-row dk-justify-between dk-w-[400px]">
          <LoadingOutlined />
          Authen
        </button>
        <ul hidden></ul>
      </div>
    </header>
  );
}
