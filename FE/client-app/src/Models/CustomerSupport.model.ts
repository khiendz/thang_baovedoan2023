import {Customer} from "./Customer.model";

export class CustomerSupport {
    SupportID: number;
    CustomerID: number;
    SupportType: string;
    SupportDate: Date;
    Description: string | null;
    Customer: Customer;
  }