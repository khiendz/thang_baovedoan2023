import { Customer } from "Models";
import { AddCustomer, DeleteCustomerById, UpdateCustomer } from "services/customer-service";

export const changeCustomer = async (customer: Customer) => {
    try {
        const result = await UpdateCustomer(customer);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddCustomer = async (customer: Customer) => {
    try {
        const result = await AddCustomer(customer);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheCustomer = async (customerId: number) => {
    if (!customerId) return null;

    try {
        const result = await DeleteCustomerById(customerId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, customers: Customer[], setCustomers: any) => {
    const result = await clearTheCustomer(key);
    const newData = customers.filter(
        (item: Customer) => item.CustomerID !== key
    );
    setCustomers(newData);
    return result;
};

export const handleAdd = async (customer: Customer, setCustomers: any, customers: Customer[]) => {
    const result = await handleAddCustomer(customer);
    if (result.data && result.status == 200)
    setCustomers([
        { ...result.data },
        ...customers,
    ]);
    return result;
};
