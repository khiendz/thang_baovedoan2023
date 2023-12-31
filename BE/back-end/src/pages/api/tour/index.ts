import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Tour } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetTours();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const tour = req.body;

        const result = await UpdateTour(tour);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the book' });
        }

        return res.json({ ...result });
    }  else if (req.method === 'POST') {
        const tour = req.body;

        const result = await AddTour(tour);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const {tourId} = req.query;

        const result = await DeleteTour(parseInt(tourId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a book' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetTours = async () => {
    try {
        const tour = await prisma.tour.findMany({
            include: {
                Bookings: {
                    include: {
                        Customer: true,
                        Payments: true,
                    }
                },
                Feedback: true,
                RoomType: {
                    include: {
                        Hotel: true
                    }
                },
                TourType: true,
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

const AddTour = async (tour: Tour) => {
    try {
        const tourResult = await prisma.tour.create({
            data: {
                TourTypeId: tour.TourTypeId,
                TourName: tour.TourName,
                Description: tour.Description,
                PriceTotal: tour.PriceTotal,
                StartDate: tour.StartDate,
                EndDate: tour.EndDate,
                Location: tour.Location,
                TotalMember: tour.TotalMember,
                TotalChd: tour.TotalChd,
                TotalElder: tour.TotalElder,
                TourID: tour.TourID,
                RoomTypeId: tour?.RoomTypeId || 0,
                Img: tour?.Img,
                RoomStartDate: tour.StartDate,
                RoomEndDate: tour.EndDate,
            },
            include: {
                Bookings: {
                    include: {
                        Customer: true,
                        Payments: true,
                    }
                },
                Feedback: true,
                RoomType: {
                    include: {
                        Hotel: true
                    }
                },
                TourType: true,
            }
        });

        if (tourResult) {
            const tourType = await prisma.tourType.findUnique({
                where: {
                    TourTypeId: tour.TourTypeId
                }
            });

            if (tourType) {
                const updateTourType = await prisma.tourType.update({
                    where: {
                        TourTypeId: tour.TourTypeId
                    },
                    data: {
                        OrderSlot: tourType.OrderSlot + tour.TotalMember
                    },
                });
            }
            
            return {
                data: tourResult,
                message: "Vui lòng chờ nhân viên liên hệ",
                status: "200"
            };
        } else {
            return {
                data: null,
                message: "Đặt tour thất bại",
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

const UpdateTour = async (tour: Tour) => {
    try {
        const updatedTourType = await prisma.tour.update({
            where: {
                TourID: tour?.TourID
            },
            data: {
                TourName: tour.TourName,
                Description: tour.Description,
                PriceTotal: tour.PriceTotal,
                StartDate: tour.StartDate,
                EndDate: tour.EndDate,
                Location: tour.Location,
                TotalMember: tour.TotalMember,
                TotalChd: tour.TotalChd,
                TotalElder: tour.TotalElder,
                TourTypeId: tour.TourTypeId,
                RoomTypeId: tour.RoomTypeId,
                Img: tour.Img,
                RoomStartDate: tour.StartDate,
                RoomEndDate: tour.EndDate,
            },
            include: {
                Bookings: {
                    include: {
                        Customer: true,
                        Payments: true,
                    }
                },
                Feedback: true,
                RoomType: {
                    include: {
                        Hotel: true
                    }
                },
                TourType: true,
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

const DeleteTour = async (tourId: number) => {
    try {
        const tour = await prisma.tour.findUnique({
            where: {
                TourID: tourId
            }
        });
        const tourType = await prisma.tourType.findUnique({
            where: {
                TourTypeId: tour?.TourTypeId
            }
        });

        const exitsPayment = await prisma.payment.deleteMany({
            where: {
                Booking: {
                    TourID: tourId
                }
            }
        });

        const exitsBooking = await prisma.booking.deleteMany({
            where: {
                TourID: tourId
            }
        });

        await prisma.tourType.update({
            where: {
                TourTypeId: tour?.TourTypeId
            },
            data: {
                OrderSlot: tourType?.OrderSlot && tour?.TotalMember ? tourType?.OrderSlot - tour?.TotalMember : tourType?.OrderSlot
            }
        })

        const result = await prisma.tour.delete({
            where: {
                TourID: tourId
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

export default apiHandler(handler,["GET","POST",]);

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
  }