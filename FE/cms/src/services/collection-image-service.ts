import axios from 'axios';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

export async function getCollectionImageByTourTypeId(id: number) {
    if (!id)
        return null;
    
    try {
        const res: any = await axios.get(`${domainBE}/api/collection-image/${id}`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllCollectionImage () {
    try {
        const res: any = await axios.get(`${domainBE}/api/collection-image`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}



