import React from 'react';
import axios from 'axios';
import { Promotion, Tour } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

export async function getPromotionById(id: string) {

    if (!id)
        return null;
    
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/promotion/${id}`)
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
        const res: any = await fetchWrapper.get(`${domainBE}/api/promotion`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdatePromotion(promotion: Promotion) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/promotion`, promotion);

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
        const res: any = await fetchWrapper.post(`${domainBE}/api/promotion`, promotion);

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
        const res: any = await fetchWrapper.delete(`${domainBE}/api/promotion?promotionId=${promotionId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}


