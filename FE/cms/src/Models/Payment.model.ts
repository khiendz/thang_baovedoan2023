import {Booking} from "./Booking.model";

export class Payment {
  PaymentID: number;
  BookingID: number;
  PaymentDate: Date;
  Amount: number;
  OrderCode: string;
  Booking: Booking;
}
