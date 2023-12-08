import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 
export const typeRegion = {
    local: 0,
    global: 1
}

export async function getTourTypeById(id: number) {
    if (!id)
        return null;
    
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/tour-type/${id}`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllTouType () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/tour-type`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getTourByRegion (region: number = typeRegion.local) {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/tour-type/region/${region}`);
        if (res.status == 200) 
            return res.data;
    } catch {
        return null;
    }
}

export async function getTopTourType (id: number = 0) {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/tour-type/top/${id}`);
        if (res.status == 200) 
            return res.data;
    } catch {
        return null;
    }
}



