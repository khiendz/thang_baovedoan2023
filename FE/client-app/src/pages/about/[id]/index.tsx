"use client";
import React from "react";
import { useRouter } from "next/router";
import LayoutDefault from "components/layouts/LayoutDefault";

export default function About() {
  const router = useRouter();
  const id = router.query.id;
  return (
    <LayoutDefault>
      {id}
    </LayoutDefault>
  );
}
