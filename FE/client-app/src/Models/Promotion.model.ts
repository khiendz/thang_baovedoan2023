import { TourType } from "./TourType.model";

export class Promotion {
  PromotionID: number;
  PromoCode: string;
  Name: string | null;
  Description?: string | null;
  Discount?: number | null;
  StartDate: Date;
  EndDate: Date;
  TourTypeId?: number | null;
  TourType?: TourType | null;
}