"use client";

import React, { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    label: (
      <Link
        href="/"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Trang chủ
      </Link>
    ),
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link
        href="/tour/trong-nuoc"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        <span>Tour du lịch trong nước</span>
      </Link>
    ),
    key: "tour-in",
  },
  {
    label: (
      <Link
        href="/tour/nuoc-ngoai"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        <span>Tour du lịch ngoài nước</span>
      </Link>
    ),
    key: "tour-out",
  },
  {
    label: (
      <Link
        href="/history-payment"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        <span>Lịch sử thanh toán</span>
      </Link>
    ),
    key: "history-payment",
  },
];

const Navigation: React.FC = () => {
  const [current, setCurrent] = useState("mail");
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <nav>
      <Menu
        className="dk-text-[#222] dk-text-lg dk-font-bold dk-py-3 dk-border-none dk-shadow-md dk-font-Inter"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </nav>
  );
};

export default Navigation;
