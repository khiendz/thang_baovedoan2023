import React from 'react';
import axios from 'axios';
import { Booking, Promotion, Tour } from 'Models';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

export async function getBookingById(id: string) {

    if (!id)
        return null;
    
    try {
        const res: any = await axios.get(`${domainBE}/api/booking/${id}`)
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

export async function getAllBooking () {
    try {
        const res: any = await axios.get(`${domainBE}/api/booking`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateBooking(booking: Booking) {
    try {
        const res: any = await axios.put(`${domainBE}/api/booking`, JSON.stringify(booking), {
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating booking:', e);
    }

    return null;
}

export async function AddBooking(booking: Booking) {
    try {
        const res: any = await axios.post(`${domainBE}/api/booking`, JSON.stringify(booking), {
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

export async function DeleteBookingById(bookingId: number) {
    try {
        const res: any = await axios.delete(`${domainBE}/api/promotion?bookingId=${bookingId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating booking:', e);
    }

    return null;
}


