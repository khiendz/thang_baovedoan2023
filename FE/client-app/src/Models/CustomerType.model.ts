import { Customer } from "./Customer.model";

export class CustomerType {
    CustomerTypeId: number;
    Name: string;
    Description?: string | null;
    Customer: Customer[];
  }