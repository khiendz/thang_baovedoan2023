import React from "react";
import { useRouter } from "next/router"; // Import the useRouter
import LayoutDefault from "components/layouts/LayoutDefault";
import TourDetail from "modules/TourDetail";

export default function LocalTour() {
  return (
      <LayoutDefault>
        <TourDetail></TourDetail>
      </LayoutDefault>
  );
}
