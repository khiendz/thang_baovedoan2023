import { RoomType } from "./RoomType.model";

export class Availability {
    AvailabilityId: number;
    DateCheck?: Date | null;
    AvailableRooms: number;
    RoomTypeId: number;
    RoomType?: RoomType | null;
  }