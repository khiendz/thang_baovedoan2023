import { RoomType } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getPRoomTypeById(id: number) {
    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/room-type/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllRoomType() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/room-type`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateRoomType(roomType: RoomType) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/room-type`, roomType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating room type:', e);
    }

    return null;
}

export async function AddRoomType(roomType: RoomType) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/room-type`, roomType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating room type:', e);
    }

    return null;
}

export async function DeleteRoomTypeById(roomTypeId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/room-type?roomTypeId=${roomTypeId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete room type:', e);
    }

    return null;
}

