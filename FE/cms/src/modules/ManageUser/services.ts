import { User } from "Models";
import { SupportType } from "Models/SupportType.model";
import { AddSupportType, AddUser, DeleteSupportTypeById, DeleteUserById, UpdateSupportType, UpdateUser } from "services";

export const changeUser = async (user: User) => {
    try {
        const result = await UpdateUser(user);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddUser = async (user: User) => {
    try {
        const result = await AddUser(user);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheUser = async (userId: number) => {
    if (!userId) return null;

    try {
        const result = await DeleteUserById(userId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, users: User[], setUsers: any) => {
    const result = await clearTheUser(key);
    const newData = users.filter(
        (item: User) => item.UserId !== key
    );
    setUsers(newData);
    return result;
};

export const handleAdd = async (user: User, setUsers: any, users: User[]) => {
    const result = await handleAddUser(user);
    if (result.data && result.status == 200)
        setUsers([
            { ...result.data },
            ...users,
        ]);
    return result;
};
