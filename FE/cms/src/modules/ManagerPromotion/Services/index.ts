import { Promotion, TourType } from "Models";
import { AddPromotion, DeletePromotionById, UpdatePromotion } from "services/promotion-services";

export const changePromotion = async (promotion: Promotion) => {
    try {
        const result = await UpdatePromotion(promotion);
        if (result) return result?.data;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddPromotion = async (promotion: Promotion) => {
    try {
        const result = await AddPromotion(promotion);
        if (result) return result?.data;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearThePromotion = async (promotionId: number) => {
    if (!promotionId) return null;

    try {
        const result = await DeletePromotionById(promotionId);
        if (result) return result?.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, promotion: Promotion[], setPromotions: any) => {
    debugger
    const result = await clearThePromotion(key);
    const newData = promotion.filter((item: Promotion) => item.PromotionID !== key);
    setPromotions(newData);
};

export const handleAdd = async (promotion: Promotion, setPromotions: any, promotions: Promotion[]) => {
    const result = await handleAddPromotion(promotion);
    setPromotions([{ ...promotion, PromotionID: promotions.length + 1 }, ...promotions]);
};