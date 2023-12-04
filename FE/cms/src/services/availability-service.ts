import { Availability } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getAvailabilityById(id: number) {
    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/availability/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllAvailability() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/availability`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateAvailability(availability: Availability) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/availability`, availability);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating availability:', e);
    }

    return null;
}

export async function AddAvailability(availability: Availability) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/availability`, availability);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating availability:', e);
    }

    return null;
}

export async function DeleteAvailabilityById(availabilityId: Availability) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/customer?availability=${availabilityId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete availability:', e);
    }

    return null;
}

