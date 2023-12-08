import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, RoomType } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetRoomType();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const roomType = req.body;

        const result = await UpdateRoomType(roomType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the room type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const roomType = req.body;

        const result = await AddRoomType(roomType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new room type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { roomTypeId } = req.query;

        const result = await DeleteRoomTypeById(parseInt(roomTypeId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a room type' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetRoomType = async () => {
    try {
        const roomTypeResult = await prisma.roomType.findMany({
            include: {
                Hotel: true,
                Availability: true,
            }
        });

        if (roomTypeResult) {
            return {
                data: roomTypeResult,
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

const AddRoomType = async (roomType: RoomType) => {
    try {
        const roomTypeResult = await prisma.roomType.create({
            data: {
                Name: roomType.Name,
                MaxOccupancy: +(roomType?.MaxOccupancy || 0),
                Price: +(roomType?.Price || 0),
                HotelId: roomType.HotelId,
                KateFee: +roomType.KateFee
            },
            include: {
                Hotel: true,
                Availability: true,
            }
        });

        return {
            data: roomTypeResult,
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

const UpdateRoomType = async (roomType: RoomType) => {
    try {
        const updateRoomTypeResult = await prisma.roomType.update({
            where: {
                RoomTypeId: roomType?.RoomTypeId
            },
            data: {
                Name: roomType.Name,
                MaxOccupancy: +(roomType?.MaxOccupancy || 0),
                Price: +(roomType?.Price || 0),
                HotelId: roomType.HotelId,
                KateFee: +roomType.KateFee
            },
            include: {
                Hotel: true,
                Availability: true,
            }
        });

        return {
            data: updateRoomTypeResult,
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

const DeleteRoomTypeById = async (roomTypeId: number) => {
    try {
        const result = await prisma.roomType.delete({
            where: {
                RoomTypeId: roomTypeId
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