import { CollectionImage } from "./CollectionImage";
import { Promotion } from "./Promotion.model";
import { Tour } from "./Tour.model";

export class TourType {
    TourTypeId: number;
    Name: string;
    Description?: string | null;
    PriceElder?: number | null;
    PriceChildren?: number | null;
    PromotionId: number;
    Img: string | null;
    RateTourType: number | null;
    CollectionImamge: CollectionImage[];
    IsLocal: number;
    StartDate: Date;
    EndDate: Date;
    MaxSlot: number | null;
    OrderSlot: number | null;
    Tours: Tour[];
    Promotion: Promotion[];
  }