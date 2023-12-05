import { RoleAccount, RoomType } from "Models";
import { AddRoleAccount, AddRoomType, DeleteRoleAccountById, DeleteRoomTypeById, UpdateRoomType } from "services";

export const changeRoomType = async (roomType: RoomType) => {
    try {
        const result = await UpdateRoomType(roomType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddRoomType = async (roomType: RoomType) => {
    try {
        const result = await AddRoomType(roomType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheRoomType = async (roomTypeId: number) => {
    if (!roomTypeId) return null;

    try {
        const result = await DeleteRoomTypeById(roomTypeId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, roomTypes: RoomType[], setRoomTypes: any) => {
    const result = await clearTheRoomType(key);
    const newData = roomTypes.filter(
        (item: RoomType) => item.RoomTypeId !== key
    );
    setRoomTypes(newData);
    return result;
};

export const handleAdd = async (roomType: RoomType, setRoomTypes: any, roomTypes: RoomType[]) => {
    const result = await handleAddRoomType(roomType);
    setRoomTypes([
        result?.data,
        ...roomTypes,
    ]);
    return result;
};
