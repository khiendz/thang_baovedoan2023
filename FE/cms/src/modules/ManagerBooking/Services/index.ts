import { Booking, Promotion, TourType } from "Models";
import { AddBooking, DeleteBookingById, UpdateBooking } from "services"
export const changeBooking = async (booking: Booking) => {
    try {
        const result = await UpdateBooking(booking);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddBooking = async (booking: Booking) => {
    try {
        const result = await AddBooking(booking);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheBooking = async (bookingId: number) => {
    if (!bookingId) return null;

    try {
        const result = await DeleteBookingById(bookingId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, booking: Booking[], setBookings: any) => {
    const result = await clearTheBooking(key);
    const newData = booking.filter((item: Booking) => item.BookingID !== key);
    setBookings(newData);
    return result;
};

export const handleAdd = async (booking: Booking, setBookings: any, bookings: Booking[]) => {
    const result = await handleAddBooking(booking);
    setBookings([{ ...booking, PromotionID: bookings.length + 1 }, ...bookings]);
    return result;
};