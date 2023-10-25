import { Promotion } from "./Promotion.model";
import { Tour } from "./Tour.model";

export class TourType {
    TourTypeId: number;
    Name: string;
    Description?: string | null;
    PriceElder?: number | null;
    PriceChildren?: number | null;
    PromotionId: number;
    Tours: Tour[];
    Promotion: Promotion[];
  }