import { NextApiRequest, NextApiResponse } from 'next';
import { Customer, CustomerSupport, PrismaClient, Promotion, Tour } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetCustomerSupport();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const customerSupport = req.body;

        const result = await UpdateCustomerSupport(customerSupport);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the customer' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const customerSupport = req.body;

        const result = await AddCustomerSupport(customerSupport);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new customer' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { customerSupportId } = req.query;

        const result = await DeleteCustomerSupport(parseInt(customerSupportId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a customer' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetCustomerSupport = async () => {
    try {
        const customerSupport = await prisma.customerSupport.findMany();

        if (customerSupport) {
            return {
                data: customerSupport,
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

const AddCustomerSupport = async (customerSupport: CustomerSupport) => {
    try {
        const customerSupportResult = await prisma.customerSupport.create({
            data: {
                CustomerID: customerSupport.CustomerID,
                SupportTypeId: customerSupport.SupportTypeId,
                SupportDate: customerSupport.SupportDate,
                Description: customerSupport.Description
            },
        });

        return {
            data: customerSupportResult,
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

const UpdateCustomerSupport = async (customerSupport: CustomerSupport) => {
    try {
        const updatedCustomerSupport = await prisma.customerSupport.update({
            where: {
                SupportID: customerSupport?.SupportTypeId
            },
            data: {
                CustomerID: customerSupport.CustomerID,
                SupportTypeId: customerSupport.SupportTypeId,
                SupportDate: customerSupport.SupportDate,
                Description: customerSupport.Description
            }
        });

        return {
            data: updatedCustomerSupport,
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

const DeleteCustomerSupport = async (customerSupportId: number) => {
    try {
        const result = await prisma.customerSupport.delete({
            where: {
                SupportID: customerSupportId
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