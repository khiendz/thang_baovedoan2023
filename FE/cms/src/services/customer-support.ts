import { CustomerSupport } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getCustomerSupportById(id: string) {
    if (!id)
        return null;
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/customer-support/${id}`);
        return res;
    } catch (e) {
        return null;
    }
}

export async function getAllCustomerSupport() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/customer-support`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateCustomerSupport(customerSupport: CustomerSupport) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/customer-support`, customerSupport);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating customer support:', e);
    }

    return null;
}

export async function AddCustomerSupport(customerSupport: CustomerSupport) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/customer-support`, customerSupport);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        return null;
    }

    return null;
}

export async function DeleteCustomerSupportById(customerSupportId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/customer-support?customerSupportId=${customerSupportId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating customer support:', e);
    }

    return null;
}


