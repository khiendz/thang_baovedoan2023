import { CustomerSupport } from "./CustomerSupport.model";

export class SupportType {
    SupportTypeId: number;
    Name: string;
    Description?: string | null;
    CustomerSupport: CustomerSupport[];
  }