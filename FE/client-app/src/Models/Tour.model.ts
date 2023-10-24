import {Booking} from "./Booking.model";

export class Tour {
    TourID: number;
    TourName: string;
    Description: string | null;
    PriceTotal: number;
    StartDate: Date;
    EndDate: Date;
    Location: string | null;
    PromotionId: number | null;
    Img: string | null;
    Bookings: Booking[];
  }
  