import { Feedback } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getFeedbackById(id: number) {
    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/feedback/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllFeedback() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/feedback`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateFeedback(feedback: Feedback) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/feedback`, feedback);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating feedback:', e);
    }

    return null;
}

export async function AddFeedback(feedback: Feedback) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/feedback`, feedback);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating feedback:', e);
    }

    return null;
}

export async function DeleteFeedbackById(feedbackId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/feedback?feedbackId=${feedbackId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete feedback:', e);
    }

    return null;
}

