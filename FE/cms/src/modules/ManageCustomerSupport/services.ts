import { CustomerSupport } from "Models";
import { AddCustomerSupport, DeleteCustomerSupportById, UpdateCustomerSupport } from "services";

export const changeCustomerSupport = async (customerSupport: CustomerSupport) => {
    try {
        const result = await UpdateCustomerSupport(customerSupport);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddCustomerSupport = async (customerSupport: CustomerSupport) => {
    try {
        const result = await AddCustomerSupport(customerSupport);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheCustomerSupport = async (customerSupportId: number) => {
    if (!customerSupportId) return null;

    try {
        const result = await DeleteCustomerSupportById(customerSupportId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, customerSupports: CustomerSupport[], setCustomerSupports: any) => {
    const result = await clearTheCustomerSupport(key);
    const newData = customerSupports.filter(
        (item: CustomerSupport) => item.SupportID !== key
    );
    setCustomerSupports(newData);
    return result;
};

export const handleAdd = async (customerSupport: CustomerSupport, setCustomerSupport: any, customerSupports: CustomerSupport[]) => {
    const result = await handleAddCustomerSupport(customerSupport);
    if (result.data && result.status == 200)
    setCustomerSupport([
        { ...result.data },
        ...customerSupports,
    ]);
    return result;
};
