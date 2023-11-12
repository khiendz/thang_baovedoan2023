import { RoomType } from "./RoomType.model";

export class Hotel {
    HotelId: number;
    Name: string;
    Address?: string | null;
    City?: string | null;
    Country?: string | null;
    StarRating?: number | null;
    Description?: string | null;
    Phone?: string | null;
    Website?: string | null;
    Email: string;
    RoomTypes: RoomType[];
  }
  