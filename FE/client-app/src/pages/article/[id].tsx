"use client"
import LayoutDefault from "../../components/layouts/LayoutDefault";
import React from "react";
import { useRouter } from "next/router";
import ArticleContent from "modules/Article";

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <LayoutDefault>
      <div className="content-container content-miss content-news dk-flex dk-flex-col dk-font-Roboto dk-gap-4 dk-z-10 dk-items-center dk-mb-7]">
        <div className=" dk-flex dk-flex-col dk-relative dk-max-w-full dk-bg-white dk-rounded-2xl dk-p-7">
          <ArticleContent id={id?.toString() || ""}/>
        </div>
      </div>
    </LayoutDefault>
  );
}
