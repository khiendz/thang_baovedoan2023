"use client";

import React, { useState } from "react";
import { HomeOutlined, BankOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { useAppContext } from "hook/use-app-context";

const items: MenuProps["items"] = [
  {
    label: (
      <Link
        href="/"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Kiểu Tour
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
        Ưu đãi
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
        Tour
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
        Booking
      </Link>
    ),
    key: "booking",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/customers"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Khách hàng
      </Link>
    ),
    key: "customers",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/payment"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Thanh toán
      </Link>
    ),
    key: "payment",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/collection-images"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Bộ sưu tập ảnh
      </Link>
    ),
    key: "collections",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/availability"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Tình trạng phòng trống
      </Link>
    ),
    key: "availability",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/account"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Tài khoản
      </Link>
    ),
    key: "account",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/customer-support"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Hỗ trợ khách hàng
      </Link>
    ),
    key: "customer-support",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/customer-type"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Kiểu khách hàng
      </Link>
    ),
    key: "customer-type",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/feedback"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Phản hồi
      </Link>
    ),
    key: "feedback",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/hotel"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Khách sạn
      </Link>
    ),
    key: "hotel",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/role-account"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Role Account
      </Link>
    ),
    key: "role-account",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/room-type"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Kiểu phòng
      </Link>
    ),
    key: "room-type",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/support-type"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Kiểu hỗ trợ
      </Link>
    ),
    key: "support-type",
    icon: <BankOutlined />,
  },
  {
    label: (
      <Link
        href="/user"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Người dùng
      </Link>
    ),
    key: "user",
    icon: <BankOutlined />,
  },
];

const Navigation: React.FC = () => {
  const { data: user } = useAppContext("user");
  const [current, setCurrent] = useState("mail");
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <nav>
      <Menu
        className={`dk-text-[#222] dk-text-lg dk-font-bold dk-py-3 dk-border-none dk-shadow-md dk-font-Inter ${
          user ? "" : "dk-hidden"
        }`}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </nav>
  );
};

export default Navigation;
