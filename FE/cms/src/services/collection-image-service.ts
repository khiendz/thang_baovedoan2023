import { CollectionImage } from 'Models';
import axios from 'axios';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getCollectionImageByTourTypeId(id: number) {
    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/collection-image/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllCollectionImage() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/collection-image`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateCollection(collection: CollectionImage) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/collection-image`, collection);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating collection:', e);
    }

    return null;
}

export async function AddCollection(collection: CollectionImage) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/collection-image`, collection);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error add collection:', e);
    }

    return null;
}

export async function DeleteCollectionById(collectionId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/collection-image?collectionId=${collectionId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete tour type:', e);
    }

    return null;
}


