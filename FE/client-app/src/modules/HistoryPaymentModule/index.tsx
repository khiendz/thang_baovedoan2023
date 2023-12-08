import { Payment } from "Models";
import { useAppContext } from "hook/use-app-context";
import { useEffect } from "react";
import { GetPaymentByPhone } from "services/payment-service";
import format from "date-fns/format";

const HistoryPayment = () => {
  const { data: user } = useAppContext("user");
  const { data: payments, setData: setPayments } = useAppContext("payments");

  useEffect(() => {
    if (user) {
      initData();
    }
  }, [user]);

  const initData = async () => {
    try {   
        const result = await GetPaymentByPhone(user ? user?.Phone : "0382033518");
        if (result && result.status == 200) {
            setPayments(result.data);
        }
    }catch (e: any) {

    } 
  }
  return <div className="dk-text-[#222] dk-font-Inter content-container content-miss dk-flex dk-flex-col dk-gap-2 dk-relative dk-z-10 dk-mb-5">
    <h2 className="dk-text-[30px] dk-font-Roboto dk-font-bold">Lịch sử giao dịch và thanh toán</h2>
    {
      user ? (
      payments ? (<div>
        {
            payments?.map((ob: Payment) => (
                <>
                    <div className="dk-text-[#222] dk-col dk-border-2 dk-border-collapse dk-bg-white dk-text-lg dk-p-4 dk-rounded-2xl dk-mt-2">
                        <div><span className="dk-font-bold">Tên khách hàng: </span>
                          {ob.Booking.Customer.FirstName + " " + ob.Booking.Customer.LastName}
                        </div>
                        <div><span className="dk-font-bold">Số điện thoại khách hàng: </span>{ob.Booking.Customer.Phone}</div>
                        <div><span className="dk-font-bold">Mã giao dịch: </span>{ob.OrderCode}</div>
                        <div><span className="dk-font-bold">Tổng tiền thanh toán </span>{`${ob.Amount.toLocaleString("vi-VN")}`}{" "} VND</div>
                        <div><span className="dk-font-bold">Ngày thanh toán: </span>{
                        `${format(ob?.PaymentDate ? new Date(ob?.PaymentDate) : new Date(),"dd-MM-yyyy")}`
                        }{" "}</div>
                        <div><span className="dk-font-bold">Mã booking </span>{`${ob.BookingID}`}</div>
                        <div><span className="dk-font-bold">Tổng thành viên </span>{`${ob?.Booking?.Tour?.TotalMember || 0}`}{" "} người</div>
                        <div><span className="dk-font-bold">Mô tả đặt tour </span>{`${ob?.Booking?.Tour?.Description || ""}`}</div>
                        {
                          ob?.Booking?.Tour?.RoomTypeId != 0 ? 
                          <>
                            <div><span className="dk-font-bold">Tên phòng: </span>{ob.Booking.Tour.RoomType.Name}</div>
                            <div><span className="dk-font-bold">Khách sạn: </span>{ob.Booking.Tour.RoomType.Hotel?.Name}</div>
                            <div><span className="dk-font-bold">Địa chỉ khách sạn: </span>{ob.Booking.Tour.RoomType.Hotel?.Address}</div>
                          </> : null
                        }
                    </div>
                </>
            ))
        }
      </div>) : null ) : 
      <div className="dk-text-red-500 dk-bg-white dk-text-[24px] dk-p-4 dk-rounded-lg">
        Vui Lòng Đăng Nhập Để Kiểm Tra Lịch Sử Thanh Toán Hoặc Liên Hệ Với Nhân Viên Qua Hotline ⚠️
        </div>
    }
  </div>;
};

export default HistoryPayment;