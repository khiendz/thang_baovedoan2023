import {Customer} from "./Customer.model";
import {Tour} from "./Tour.model";
import {Payment} from "./Payment.model";

export class Booking {
  BookingID: number;
  CustomerID: number;
  TourID: number;
  BookingDate: Date;
  Customer: Customer;
  Tour: Tour;
  Payments: Payment[];
}