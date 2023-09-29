import {Customer} from "./Customer.model";
import {Tour} from "./Tour.model";

export class Feedback {
    FeedbackID: number;
    CustomerID: number;
    TourID: number;
    Rating: number | null;
    Comment: string | null;
    Customer: Customer;
    Tour: Tour;
  }