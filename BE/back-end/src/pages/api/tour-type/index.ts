import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, TourType } from '@prisma/client';
import { apiHandler } from 'helpers/api';
import { isBase64, saveFile } from 'services/file';
const fs = require('fs');
const path = require('path');

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
        const tour = await prisma.tourType.findMany({
            include: {
                CollectImg: true,
                Promotion: true,
                Tours: true
            }
        });

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
            data: null,
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
                Description: tourTypeData?.Description?.toString(),
                PriceElder: tourTypeData.PriceElder,
                PriceChildren: tourTypeData.PriceChildren,
                PromotionId: tourTypeData?.PromotionId || 0,
                Img: "",
                IsLocal: tourTypeData.IsLocal,
                RateTourType: tourTypeData.RateTourType,
                StartDate: tourTypeData.StartDate,
                EndDate: tourTypeData.EndDate,
                MaxSlot: tourTypeData.MaxSlot,
                OrderSlot: tourTypeData.OrderSlot
            },
        });

        if (tourTypeData.Img) {
            const filename = await saveFile(tourTypeData.Img, tour.TourTypeId);
            tour.Img = filename;
        }

        const updatedTourType = await prisma.tourType.update({
            where: {
                TourTypeId: tour?.TourTypeId
            },
            data: tour
        });

        if (tour) {
            return {
                data: tour,
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
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const UpdateTourType = async (tourType: TourType) => {
    try {
        let updateData: any = {
            Name: tourType.Name,
            Description: tourType.Description?.toString(),
            PriceElder: tourType.PriceElder,
            PriceChildren: tourType.PriceChildren,
            PromotionId: tourType.PromotionId,
            RateTourType: tourType.RateTourType,
            StartDate: tourType.StartDate,
            EndDate: tourType.EndDate,
            MaxSlot: tourType.MaxSlot,
            OrderSlot: tourType.OrderSlot
        };

        if (tourType.Img && !tourType.Img.startsWith("file")) {
            const filename = await saveFile(tourType.Img, tourType.TourTypeId);
            updateData.Img = filename;
        }

        const updatedTourType = await prisma.tourType.update({
            where: {
                TourTypeId: tourType?.TourTypeId
            },
            data: updateData
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

        await prisma.booking.deleteMany({
            where: {
                Tour: {
                    TourType: {
                        TourTypeId: tourTypeId
                    }
                }
            }
        });

        await prisma.promotion.deleteMany({
            where: {
                TourTypeId: tourTypeId
            }
        });

        await prisma.tour.deleteMany({
            where: {
                TourTypeId: tourTypeId
            }
        });

        await prisma.payment.deleteMany({
            where: {
                Booking: {
                    Tour: {
                        TourType: {
                            TourTypeId: tourTypeId
                        }
                    }
                }
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

export default apiHandler(handler,["GET","PUT"]);

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
  }