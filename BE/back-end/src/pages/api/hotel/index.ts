import { NextApiRequest, NextApiResponse } from 'next';
import { Feedback, Hotel, PrismaClient } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetHotel();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const hotel = req.body;

        const result = await UpdateHotel(hotel);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the feedback' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const hotel = req.body;

        const result = await AddHotel(hotel);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new feedback' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { hotelId } = req.query;

        const result = await DeleteHotel(parseInt(hotelId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a feedback' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetHotel = async () => {
    try {
        const hotelResult = await prisma.hotel.findMany();

        if (hotelResult) {
            return {
                data: hotelResult,
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

const AddHotel = async (hotel: Hotel) => {
    try {
        const exitsPhone = hotel.Phone ?  await prisma.hotel.findUnique({
            where: {
                Phone: hotel.Phone
            }
        }) : null;

        if (exitsPhone) {
            return {
                data: null,
                message: "Đã tồn tại khách sạn trùng số điện thoại",
                status: "500"
            };
        }
        const hotelResult = await prisma.hotel.create({
            data: {
                Name: hotel.Name,
                Address: hotel.Address,
                Country: hotel.Country,
                StarRating: +(hotel.StarRating || 0),
                Description: hotel.Description,
                Phone: hotel.Phone,
                Website: hotel.Website,
                Email: hotel.Email
            },
        });

        return {
            data: hotelResult,
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

const UpdateHotel = async (hotel: Hotel) => {
    try {
        
        const exitsPhone = hotel.Phone ?  await prisma.hotel.findUnique({
            where: {
                Phone: hotel.Phone
            }
        }) : null;

        if (exitsPhone) {
            return {
                data: null,
                message: "Đã tồn tại khách sạn trùng số điện thoại",
                status: "500"
            };
        }

        const updateHotel = await prisma.hotel.update({
            where: {
                HotelId: hotel?.HotelId
            },
            data: {
                Name: hotel.Name,
                Address: hotel.Address,
                Country: hotel.Country,
                StarRating: +(hotel.StarRating || 0),
                Description: hotel.Description,
                Phone: hotel.Phone,
                Website: hotel.Website,
                Email: hotel.Email,
                City: hotel.City
            }
        });

        return {
            data: updateHotel,
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

const DeleteHotel = async (hotelId: number) => {
    try {
        const result = await prisma.hotel.delete({
            where: {
                HotelId: hotelId
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

export default apiHandler(handler,["GET"]);