import { Customer, TourType } from 'Models';
import { CustomerType } from 'Models/CustomerType.model';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

export async function getCustomerTypeById(id: number) {
    if (!id)
        return null;
    
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/customer-type/${id}`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllCustomerType () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/customer-type`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateCustomerType(customerType: CustomerType) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/customer-type`, customerType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating customer:', e);
    }

    return null;
}

export async function AddCustomerType(customerType: CustomerType) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/customer`, customerType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating customer:', e);
    }

    return null;
}

export async function DeleteCustomerTypeById(customerTypeId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/customer-type?customerTypeId=${customerTypeId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete tour type:', e);
    }

    return null;
}

