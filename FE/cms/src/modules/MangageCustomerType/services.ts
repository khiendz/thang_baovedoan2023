import { CustomerSupport } from "Models";
import { CustomerType } from "Models/CustomerType.model";
import { AddCustomerSupport, AddCustomerType, DeleteCustomerSupportById, DeleteCustomerTypeById, UpdateCustomerSupport, UpdateCustomerType } from "services";

export const changeCustomerType = async (customerType: CustomerType) => {
    try {
        const result = await UpdateCustomerType(customerType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddCustomerType = async (customerType: CustomerType) => {
    try {
        const result = await AddCustomerType(customerType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheCustomerSupport = async (customerTypeId: number) => {
    if (!customerTypeId) return null;

    try {
        const result = await DeleteCustomerTypeById(customerTypeId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, customerTypes: CustomerType[], setCustomerTypes: any) => {
    const result = await clearTheCustomerSupport(key);
    const newData = customerTypes.filter(
        (item: CustomerType) => item.CustomerTypeId !== key
    );
    setCustomerTypes(newData);
    return result;
};

export const handleAdd = async (customerType: CustomerType, setCustomerTypes: any, customerTypes: CustomerSupport[]) => {
    const result = await handleAddCustomerType(customerType);
    if (result.data && result.status == 200)
        setCustomerTypes([
            { ...result.data },
            ...customerTypes,
        ]);
    return result;
};
