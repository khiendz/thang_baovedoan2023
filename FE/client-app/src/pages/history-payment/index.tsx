import React from "react";
import LayoutDefault from "components/layouts/LayoutDefault";
import HistoryPayment from "modules/HistoryPaymentModule";
import { useAppContext } from "hook/use-app-context";

export default function LocalTour() {
  return (
      <LayoutDefault>
        <HistoryPayment></HistoryPayment>
      </LayoutDefault>
  );
}
