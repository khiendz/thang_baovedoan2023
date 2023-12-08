import { NextApiRequest, NextApiResponse } from 'next';
import { Availability, CustomerType, PrismaClient } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetAvailability();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const availability = req.body;

        const result = await UpdateAvailability(availability);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the availability type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const availability = req.body;

        const result = await AddAvailability(availability);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new customer type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { availabilityId } = req.query;

        const result = await DeleteAvailability(parseInt(availabilityId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a customer type' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetAvailability = async () => {
    try {
        const availability = await prisma.availability.findMany();

        if (availability) {
            return {
                data: availability,
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

const AddAvailability = async (availability: Availability) => {
    try {
        const availabilityAddResult = await prisma.availability.create({
            data: {
                AvailableRooms: availability.AvailableRooms,
                DateCheck: availability.DateCheck,
                RoomTypeId: availability.RoomTypeId
            },
        });

        return {
            tour: availabilityAddResult,
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

const UpdateAvailability = async (availability: Availability) => {
    try {
        const updatedAvailability = await prisma.availability.update({
            where: {
                AvailabilityId: availability?.AvailabilityId
            },
            data: {
                AvailableRooms: availability.AvailableRooms,
                DateCheck: availability.DateCheck,
                RoomTypeId: availability.RoomTypeId
            }
        });

        return {
            data: updatedAvailability,
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

const DeleteAvailability = async (availabilityId: number) => {
    try {
        const result = await prisma.availability.delete({
            where: {
                AvailabilityId: availabilityId
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