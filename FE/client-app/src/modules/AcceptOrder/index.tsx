"use client";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { Formik } from "formik";

export default function AcceptOrder() {
  return (<div className={styles.container}>
    <div className={`${styles.content} dk-flex dk-items-center dk-justify-center`}>
        <div className="dk-bg-white dk-w-[440px] dk-p-4 dk-rounded-md dk-relative dk-z-10">
            <p className="dk-font-Inter dk-text-[#329ebe] dk-text-2xl dk-font-bold">Yêu cầu đặt</p>
            <p className="dk-text-sm dk-font-Merriweather dk-text-gray-400">Quý khách vui lòng nhập thông tin liên hệ bên dưới</p>
            {/* <Formik>

            </Formik> */}
        </div>
    </div>
  </div>)
}
