"use client";

import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { useAppContext } from "hook/use-app-context";
import {CaretDownOutlined} from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    label: (
      <Link
        href="/"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Quản trị tour
      </Link>
    ),
    icon: <CaretDownOutlined />,
    key: "home",
    children: [
      {
        label: (
          <Link
            href="/"
            className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
          >
            Kiểu tour
          </Link>
        ),
        icon: <CaretDownOutlined />,
        key: "home",
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
      },
    ]
  },
  {
    label: (
      <Link
        href="/account"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Quản trị tài khoản
      </Link>
    ),
    key: "account",
    icon: <CaretDownOutlined />,
    children: [
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
      },
    ]
  },
  {
    label: (
      <Link
        href="/customer-support"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        Quản trị khách hàng
      </Link>
    ),
    icon: <CaretDownOutlined />,
    key: "customer-support",
    children: [
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
      },
    ]
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
  },
  {
    label: (
      <Link
        href="/article"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        <span>Tin tức</span>
      </Link>
    ),
    key: "article",
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
