"use client";

import React, { useState } from "react";
import { HomeOutlined, BankOutlined } from "@ant-design/icons";
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
        Quản lý các loại Tour
      </Link>
    ),
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link
        href="/uu-dai"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Quản lý ưu đãi
      </Link>
    ),
    key: "discount",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/tour"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Quản lý tour
      </Link>
    ),
    key: "tour",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/booking"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Quản lý booking
      </Link>
    ),
    key: "booking",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/customer"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Quản lý khách hàng
      </Link>
    ),
    key: "customer",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/report"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Quản lý báo cáo
      </Link>
    ),
    key: "report",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/payment"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Quản lý thanh toán
      </Link>
    ),
    key: "payment",
    icon: <BankOutlined />,
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
