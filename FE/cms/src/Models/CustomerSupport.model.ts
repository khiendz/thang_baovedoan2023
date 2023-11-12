import {Customer} from "./Customer.model";
import { SupportType } from "./SupportType.model";

export class CustomerSupport {
  SupportID: number;
  CustomerID: number;
  SupportTypeId: number;
  SupportDate: Date;
  Description?: string | null;
  Customer: Customer;
  SupportType: SupportType;
}