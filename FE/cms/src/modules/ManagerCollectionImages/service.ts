import { CollectionImage, TourType } from "Models";
import { AddCollection, AddTourType, DeleteCollectionById, DeleteTourTypeById, UpdateCollection, UpdateTourType } from "services";

export const changeCollection = async (collection: CollectionImage) => {
    try {
        const result = await UpdateCollection(collection);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddCollection = async (collection: CollectionImage) => {
    try {
        const result = await AddCollection(collection);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheCollection = async (collectionId: number) => {
    if (!collectionId) return null;

    try {
        const result = await DeleteCollectionById(collectionId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, collections: CollectionImage[], setCollection: any) => {
    const result = await clearTheCollection(key);
    const newData = collections.filter(
        (item: CollectionImage) => item.CollectImgId !== key
    );
    setCollection(newData);
    return result;
};

export const handleAdd = async (collection: CollectionImage, setCollection: any, collections: CollectionImage[]) => {
    const result = await handleAddCollection(collection);
    setCollection([
        result?.collectImg,
        ...collections,
    ]);
    return result;
};
