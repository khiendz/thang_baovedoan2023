import { NextApiRequest, NextApiResponse } from 'next';
import { Customer, CustomerType, PrismaClient, Promotion, Tour } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetCustomerType();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const customerType = req.body;

        const result = await UpdateCustomerType(customerType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the customer type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const customerType = req.body;

        const result = await AddCustomerType(customerType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new customer type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { customerTypeId } = req.query;

        const result = await DeleteCustomerType(parseInt(customerTypeId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a customer type' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetCustomerType = async () => {
    try {
        const customerType = await prisma.customerType.findMany();

        if (customerType) {
            return {
                data: customerType,
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

const AddCustomerType = async (customerType: CustomerType) => {
    try {
        const customerResult = await prisma.customerType.create({
            data: {
                Name: customerType.Name,
                Description: customerType.Description
            },
        });

        return {
            tour: customerResult,
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

const UpdateCustomerType = async (customerType: CustomerType) => {
    try {
        const updatedCustomerType = await prisma.customerType.update({
            where: {
                CustomerTypeId: customerType?.CustomerTypeId
            },
            data: {
                Name: customerType.Name,
                Description: customerType.Description
            }
        });

        return {
            data: updatedCustomerType,
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

const DeleteCustomerType = async (customerTypeId: number) => {
    try {
        const result = await prisma.customerType.delete({
            where: {
                CustomerTypeId: customerTypeId
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