import React from 'react';
import axios from 'axios';
import { Tour } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

export async function getTourById(id: string) {

    if (!id)
        return null;
    
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/tour/${id}`)
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

export async function getAllTour () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/tour`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateTour(tour: Tour) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/tour`, tour);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

export async function AddTour(tour: Tour) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/tour`,tour);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

export async function DeleteTourById(tourId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/tour?tourId=${tourId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}


