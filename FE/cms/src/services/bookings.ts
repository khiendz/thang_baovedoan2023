import axios from 'axios';
import { Booking } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getBookingById(id: string) {
    if (!id)
        return null;
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/booking/${id}`);
        return res;
    } catch (e) {
        return null;
    }
}

export async function getAllBooking() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/booking`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateBooking(booking: Booking) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/booking`, booking);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating booking:', e);
    }

    return null;
}

export async function AddBooking(booking: Booking) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/booking`, booking);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        return null;
    }

    return null;
}

export async function DeleteBookingById(bookingId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/promotion?bookingId=${bookingId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating booking:', e);
    }

    return null;
}


