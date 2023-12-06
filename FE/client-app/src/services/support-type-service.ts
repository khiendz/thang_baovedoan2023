import { RoomType } from 'Models';
import { SupportType } from 'Models/SupportType.model';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getSupportTypeById(id: number) {
    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/support-type/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllSupportType() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/support-type`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateSupportType(supportType: SupportType) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/support-type`, supportType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating support type:', e);
    }

    return null;
}

export async function AddSupportType(supportType: SupportType) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/support-type`, supportType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating support type:', e);
    }

    return null;
}

export async function DeleteSupportTypeById(supportTypeId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/support-type?supportTypeId=${supportTypeId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete support type:', e);
    }

    return null;
}

