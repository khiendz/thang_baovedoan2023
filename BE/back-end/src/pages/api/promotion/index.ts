import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Promotion, Tour } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetPromotions();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const promotion = req.body;

        const result = await UpdatePromotion(promotion);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the book' });
        }

        return res.json({ ...result });
    }  else if (req.method === 'POST') {
        const promotion = req.body;

        const result = await AddPromotion(promotion);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const {promotionId} = req.query;

        const result = await DeletePromotion(parseInt(promotionId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a book' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetPromotions = async () => {
    try {
        const promotion = await prisma.promotion.findMany();

        if (promotion) {
            return {
                data: promotion,
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

const AddPromotion = async (promotion: Promotion) => {
    try {
        const promotionResult = await prisma.promotion.create({
            data: {
                PromotionID: promotion.PromotionID,
                PromoCode: promotion.PromoCode,
                Description: promotion.Description,
                Discount: promotion.Discount,
                StartDate: promotion.StartDate,
                EndDate: promotion.EndDate,
                TourTypeId: promotion.TourTypeId
            },
        });

        if (promotionResult) {
            return {
                tour: promotionResult,
                message: "Success",
                status: "200"
            };
        } else {
            return {
                tour: null,
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

const UpdatePromotion = async (promotion: Promotion) => {
    try {
        const updatedTourType = await prisma.promotion.update({
            where: {
                PromotionID: promotion?.PromotionID
            },
            data: {
                PromoCode: promotion.PromoCode,
                Description: promotion.Description,
                Discount: promotion.Discount,
                StartDate: promotion.StartDate,
                EndDate: promotion.EndDate,
                TourTypeId: promotion.TourTypeId
            }
        });

        return {
            data: updatedTourType,
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

const DeletePromotion = async (promotionId: number) => {
    try {
        const result = await prisma.promotion.delete({
            where: {
                PromotionID: promotionId
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

export default handler;