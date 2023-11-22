import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, TourType } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetToursTypes();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const tourType = req.body;

        const result = await UpdateTourType(tourType);
        tourType
        if (!result) {
            return res.status(500).json({ error: 'Failed to update the book' });
        }

        return res.json({ ...result });
    }  else if (req.method === 'POST') {
        const tourType = req.body;

        const result = await AddTourType(tourType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const {tourTypeId} = req.query;

        const result = await DeleteBorrowedBook(parseInt(tourTypeId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a book' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetToursTypes = async () => {
    try {
        const tour = await prisma.tourType.findMany();

        if (tour) {
            return {
                data: tour,
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

const AddTourType = async (tourTypeData: TourType) => {
    try {
        const tour = await prisma.tourType.create({
            data: {
                Name: tourTypeData.Name,
                Description: tourTypeData.Description,
                PriceElder: tourTypeData.PriceElder,
                PriceChildren: tourTypeData.PriceChildren,
                PromotionId: tourTypeData.PromotionId,
                Img: tourTypeData.Img,
                IsLocal: tourTypeData.IsLocal,
                RateTourType: tourTypeData.RateTourType
            },
        });

        if (tour) {
            return {
                tour: tour,
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

const UpdateTourType = async (tourType: TourType) => {
    try {
        const updatedTourType = await prisma.tourType.update({
            where: {
                TourTypeId: tourType?.TourTypeId
            },
            data: {
                Name: tourType.Name,
                Description: tourType.Description,
                PriceElder: tourType.PriceElder,
                PriceChildren: tourType.PriceChildren,
                PromotionId: tourType.PromotionId,
                Img: tourType.Img,
                RateTourType: tourType.RateTourType
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

const DeleteBorrowedBook = async (tourTypeId: number) => {
    try {

        await prisma.promotion.deleteMany({
            where: {
                TourTypeId: tourTypeId
            }
        });

        await prisma.collectImg.deleteMany({
            where: {
                TourTypeId: tourTypeId
            }
        });

        const result = await prisma.tourType.delete({
            where: {
                TourTypeId: tourTypeId
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
