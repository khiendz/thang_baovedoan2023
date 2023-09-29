import {Booking} from "./Booking.model";
import {Feedback} from "./Feedback.model";
import {CustomerSupport} from "./CustomerSupport.model";

export class Customer {
    CustomerID: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string | null;
    Address: string | null;
    Bookings: Booking[];
    Feedback: Feedback[];
    Support: CustomerSupport[];
  }