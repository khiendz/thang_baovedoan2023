import React from 'react';
import axios from 'axios';
import { Tour } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

export async function getTourById(id: string) {

    if (!id)
        return null;
    
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/tour/${id}`);
        return res.data;
    } catch (e) {
        return null;
    }
}

