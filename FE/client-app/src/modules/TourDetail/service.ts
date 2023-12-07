import { Tour, TourType } from "Models";

export const initTour = (tourTypes: TourType) => {
    let tourInit = new Tour();
    tourInit.TotalChd = 0;
    tourInit.TotalElder = 0;
    tourInit.TourName = tourTypes.Name;
    tourInit.StartDate = tourTypes.StartDate;
    tourInit.EndDate = tourTypes.EndDate;
    tourInit.Location = tourTypes.Description;
    tourInit.TotalMember = 0;
    tourInit.TotalChd = 0;
    tourInit.TotalElder = 0;
    tourInit.PriceTotal = 0;
    tourInit.TourTypeId = tourTypes.TourTypeId;
    tourInit.RoomTypeId = 0;
    tourInit.Img = tourTypes.Img;
    tourInit.RoomStartDate = tourTypes.StartDate;
    tourInit.RoomEndDate = tourTypes.EndDate;
    return tourInit;
}