import {Booking} from "./Booking.model";

export class Payment {
  PaymentID: number;
  BookingID: number;
  PaymentDate: Date;
  Amount: number;
  Booking: Booking;
  OrderCode: string;
}
