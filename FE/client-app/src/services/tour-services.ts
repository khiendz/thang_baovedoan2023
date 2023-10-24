import React from 'react';
import axios from 'axios';
import { Tour } from 'Models';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

export async function getTourById(id: string) {

    if (!id)
        return null;
    
    try {
        const res: any = await axios.get(`${domainBE}/api/tour/${id}`)
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

