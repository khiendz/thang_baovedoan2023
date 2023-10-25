import {Booking} from "./Booking.model";
import {Feedback} from "./Feedback.model";
import {CustomerSupport} from "./CustomerSupport.model";
import { CustomerType } from "./CustomerType.model";

export class Customer {
  CustomerID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone?: string | null;
  Address?: string | null;
  CustomerTypeId: number;
  Bookings: Booking[];
  Feedback: Feedback[];
  Support: CustomerSupport[];
  CustomerType: CustomerType;
}