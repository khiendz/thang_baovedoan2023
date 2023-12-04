import { Customer, TourType } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

export const typeRegion = {
    local: 0,
    global: 1
}

export async function getCustomerById(id: number) {
    if (!id)
        return null;
    
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/customer/${id}`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllCustomer () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/customer`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateCustomer(customer: Customer) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/customer`, customer);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating customer:', e);
    }

    return null;
}

export async function AddCustomer(customer: Customer) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/customer`, customer);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating customer:', e);
    }

    return null;
}

export async function DeleteCustomerById(customerId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/customer?customerId=${customerId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete tour type:', e);
    }

    return null;
}

