import {Booking} from "./Booking.model";

export class Tour {
    TourID: number;
    TourName: string;
    Description: string | null;
    Price: number;
    StartDate: Date;
    EndDate: Date;
    Location: string | null;
    Bookings: Booking[];
  }
  