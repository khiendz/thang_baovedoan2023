import { Account, Availability, Customer } from "Models";
import { AddAccount, AddAvailability, DeleteAccountById, DeleteAvailabilityById, UpdateAccount, UpdateAvailability } from "services";
import { AddCustomer, DeleteCustomerById, UpdateCustomer } from "services/customer-service";

export const changeAvailability = async (availability: Availability) => {
    try {
        const result = await UpdateAvailability(availability);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddAvailability = async (availability: Availability) => {
    try {
        const result = await AddAvailability(availability);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheAvailability = async (availabilityId: number) => {
    if (!availabilityId) return null;

    try {
        const result = await DeleteAvailabilityById(availabilityId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, availabilities: Availability[], setAvailabilities: any) => {
    const result = await clearTheAvailability(key);
    const newData = availabilities.filter(
        (item: Availability) => item.AvailabilityId !== key
    );
    setAvailabilities(newData);
    return result;
};

export const handleAdd = async (availability: Availability, setAvailabilities: any, availabilities: Availability[]) => {
    const result = await handleAddAvailability(availability);
    if (result.data && result.status == 200)
        setAvailabilities([
            { ...result.data },
            ...availabilities,
        ]);
    return result;
};
