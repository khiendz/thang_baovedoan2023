import { NextApiRequest, NextApiResponse } from 'next';
import { Feedback, PrismaClient } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetFeedback();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const feedback = req.body;

        const result = await UpdateFeedback(feedback);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the feedback' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const feedback = req.body;

        const result = await AddFeedback(feedback);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new feedback' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { feedbackId } = req.query;

        const result = await DeleteFeedback(parseInt(feedbackId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a feedback' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetFeedback = async () => {
    try {
        const feedback = await prisma.feedback.findMany();

        if (feedback) {
            return {
                data: feedback,
                message: "Success",
                status: "200"
            };
        } else {
            return {
                data: null,
                message: "No Success",
                status: "500"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            tour: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const AddFeedback = async (feedback: Feedback) => {
    try {
        const feedbackResult = await prisma.feedback.create({
            data: {
               CustomerID: feedback.CustomerID,
               TourID: feedback.TourID,
               Rating: feedback.Rating,
               Comment: feedback.Comment
            },
        });

        return {
            data: feedbackResult,
            message: "Success",
            status: "200",
        };

    } catch (error) {
        console.error(error);
        return {
            tour: null,
            message: "Internal Server Error",
            status: "500",
        };
    }
}

const UpdateFeedback = async (feedback: Feedback) => {
    try {
        const updateFeedback = await prisma.feedback.update({
            where: {
                FeedbackID: feedback?.FeedbackID
            },
            data: {
                CustomerID: feedback.CustomerID,
                TourID: feedback.TourID,
                Rating: feedback.Rating,
                Comment: feedback.Comment
            }
        });

        return {
            data: updateFeedback,
            message: "Success",
            status: "200"
        };
    } catch (e) {
        console.error(e);
        return {
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const DeleteFeedback = async (feedbackId: number) => {
    try {
        const result = await prisma.feedback.delete({
            where: {
                FeedbackID: feedbackId
            }
        })

        return {
            data: result,
            message: "Success",
            status: "200"
        };
    } catch (e) {
        console.error(e);
        return {
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

export default apiHandler(handler);