import { Payment } from "Models";
import { useAppContext } from "hook/use-app-context";
import { useEffect, useState } from "react";
import { GetPaymentByPhone } from "services/payment-service";

const HistoryPayment = () => {
  const { data: payments, setData: setPayments } = useAppContext("payments");
  useEffect(() => {
    initData();
  }, []);
  const initData = async () => {
    try {   
        const result = await GetPaymentByPhone("0382033518");
        if (result && result.status == 200) {
            setPayments(result.data);
        }
    }catch (e: any) {

    } 
  }
  return <div className="dk-text-[#222] dk-font-Inter content-container content-miss dk-flex dk-flex-col dk-gap-2 dk-relative dk-z-10 dk-mb-5">
    {
      payments ? (<div>
        {
            payments?.map((ob: Payment) => (
                <>
                    <div className="dk-text-[#222] dk-col dk-border-2 dk-border-collapse dk-bg-white dk-text-lg dk-p-4">
                        <div><span className="dk-font-bold">Tên khách hàng: </span>{ob.Booking.Customer.LastName}</div>
                        <div><span className="dk-font-bold">Số điện thoại khách hàng: </span>{ob.Booking.Customer.Phone}</div>
                        <div><span className="dk-font-bold">Mã giao dịch: </span>{ob.PaymentID}</div>
                        <div><span className="dk-font-bold">Tổng tiền thanh toán </span>{`${ob.Amount.toLocaleString("vi-VN")}`}{" "} VND</div>
                    </div>
                </>
            ))
        }
      </div>) : null
    }
  </div>;
};

export default HistoryPayment;