import React from 'react';
import axios from 'axios';
import { Promotion, Tour } from 'Models';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

export async function getPromotionById(id: string) {

    if (!id)
        return null;
    
    try {
        const res: any = await axios.get(`${domainBE}/api/promotion/${id}`)
        .then(respones => {
            console.log(respones)
            return respones?.data;
        })
        .catch(error => {
            console.log(error)
            return {
                status: 400,
                message: `Lỗi: ${error}`
            };
        });
    } catch (e) {
        return null;
    }
}

export async function getAllPromotion () {
    try {
        const res: any = await axios.get(`${domainBE}/api/promotion`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdatePromotion(promotion: Promotion) {
    try {
        const res: any = await axios.put(`${domainBE}/api/promotion`, JSON.stringify(promotion), {
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

export async function AddPromotion(promotion: Promotion) {
    try {
        const res: any = await axios.post(`${domainBE}/api/promotion`, JSON.stringify(promotion), {
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

export async function DeletePromotionById(promotionId: number) {
    try {
        const res: any = await axios.delete(`${domainBE}/api/promotion?promotionId=${promotionId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}


