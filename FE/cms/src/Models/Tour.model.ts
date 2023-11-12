import { Booking } from "./Booking.model";
import { Feedback } from "./Feedback.model";
import { RoomType } from "./RoomType.model";
import { TourType } from "./TourType.model";

export class Tour {
  TourID: number;
  TourName: string;
  Description?: string | null;
  PriceTotal: number;
  StartDate: Date;
  EndDate: Date;
  Location?: string | null;
  TotalMember: number;
  TotalChd: number;
  TotalElder: number;
  TourTypeId: number;
  RoomTypeId: number;
  Img?: string | null;
  RoomStartDate: Date;
  RoomEndDate: Date;
  TourType: TourType;
  RoomType: RoomType;
  Bookings: Booking[];
  Feedback: Feedback[];
}