import { Customer, Feedback } from "Models";
import { AddFeedback, DeleteFeedbackById, UpdateFeedback } from "services";
import { AddCustomer, DeleteCustomerById, UpdateCustomer } from "services/customer-service";

export const changeFeedback = async (feedback: Feedback) => {
    try {
        const result = await UpdateFeedback(feedback);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddFeedback = async (feedback: Feedback) => {
    try {
        const result = await AddFeedback(feedback);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheFeedback = async (feedbackId: number) => {
    if (!feedbackId) return null;

    try {
        const result = await DeleteFeedbackById(feedbackId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, feedbacks: Feedback[], setFeedback: any) => {
    const result = await clearTheFeedback(key);
    const newData = feedbacks.filter(
        (item: Feedback) => item.FeedbackID !== key
    );
    setFeedback(newData);
    return result;
};

export const handleAdd = async (feedback: Feedback, setFeedbacks: any, feedbacks: Feedback[]) => {
    const result = await handleAddFeedback(feedback);
    if (result.data && result.status == 200)
        setFeedbacks([
            { ...result.data },
            ...feedbacks,
        ]);
    return result;
};
