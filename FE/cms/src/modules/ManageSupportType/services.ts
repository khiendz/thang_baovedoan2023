import { SupportType } from "Models/SupportType.model";
import { AddSupportType, DeleteSupportTypeById, UpdateSupportType } from "services";

export const changeSupportType = async (supportType: SupportType) => {
    try {
        const result = await UpdateSupportType(supportType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddSupportType = async (supportType: SupportType) => {
    try {
        const result = await AddSupportType(supportType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheSupportType = async (supportTypeId: number) => {
    if (!supportTypeId) return null;

    try {
        const result = await DeleteSupportTypeById(supportTypeId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, supportTypes: SupportType[], setSupportTypes: any) => {
    const result = await clearTheSupportType(key);
    const newData = setSupportTypes.filter(
        (item: SupportType) => item.SupportTypeId !== key
    );
    setSupportTypes(newData);
    return result;
};

export const handleAdd = async (supportType: SupportType, setSupportTypes: any, supportTypes: SupportType[]) => {
    const result = await handleAddSupportType(supportType);
    if (result.data && result.status == 200)
        setSupportTypes([
            { ...result.data },
            ...supportTypes,
        ]);
    return result;
};
