import { Availability } from "./Availability.model";
import { Hotel } from "./Hotel.model";
import { Tour } from "./Tour.model";

export class RoomType {
    RoomTypeId: number;
    Name?: string | null;
    MaxOccupancy?: number | null;
    Price: number;
    HotelId: number;
    KateFee: number;
    Availability: Availability[];
    Hotel?: Hotel | null;
    Tour: Tour[];
  }