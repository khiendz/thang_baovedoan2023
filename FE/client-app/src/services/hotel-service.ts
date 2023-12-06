import { Feedback, Hotel } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getHotelById(id: number) {
    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/hotel/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllHotel() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/hotel`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateHotel(hotel: Hotel) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/hotel`, hotel);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating hotel:', e);
    }

    return null;
}

export async function AddHotel(hotel: Hotel) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/hotel`, hotel);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating hotel:', e);
    }

    return null;
}

export async function DeleteHotelById(hotelId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/hotel?hotelId=${hotelId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete hotel:', e);
    }

    return null;
}

