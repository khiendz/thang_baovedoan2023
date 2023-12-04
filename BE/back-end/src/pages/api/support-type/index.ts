import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, RoleAccount, RoomType, SupportType } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetSupportType();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const supportType = req.body;

        const result = await UpdateSupportType(supportType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the support type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const supportType = req.body;

        const result = await AddSupportType(supportType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new support type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { supportTypeId } = req.query;

        const result = await DeleteSupportTypeById(parseInt(supportTypeId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a support type' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetSupportType = async () => {
    try {
        const supportTypeResult = await prisma.supportType.findMany();

        if (supportTypeResult) {
            return {
                data: supportTypeResult,
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

const AddSupportType = async (supportType: SupportType) => {
    try {
        const supportTypeResult = await prisma.supportType.create({
            data: {
                Name: supportType.Name,
                Description: supportType.Description
            },
        });

        return {
            data: supportTypeResult,
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

const UpdateSupportType = async (supportType: SupportType) => {
    try {
        const updateRoomTypeResult = await prisma.supportType.update({
            where: {
                SupportTypeId: supportType?.SupportTypeId
            },
            data: {
                Name: supportType.Name,
                Description: supportType.Description
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

const DeleteSupportTypeById = async (supportTypeID: number) => {
    try {
        const result = await prisma.supportType.delete({
            where: {
                SupportTypeId: supportTypeID
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