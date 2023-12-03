import { NextApiRequest, NextApiResponse } from 'next';
import { Customer, PrismaClient, Promotion, Tour } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetCustomers();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const customer = req.body;

        const result = await UpdateCustomer(customer);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the customer' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const customer = req.body;

        const result = await AddCustomer(customer);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new customer' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { customerId } = req.query;

        const result = await DeleteCustomer(parseInt(customerId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a customer' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetCustomers = async () => {
    try {
        const customer = await prisma.customer.findMany();

        if (customer) {
            return {
                data: customer,
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

const AddCustomer = async (customer: Customer) => {
    try {
        const existingCustomer = await prisma.customer.findMany({
            where: {
                Phone: customer?.Phone,
            },
        });

        let customerResult = null;

        if (existingCustomer) {
            customerResult = await prisma.customer.updateMany({
                where: {
                    Phone: customer.Phone,
                },
                data: {
                    FirstName: customer.FirstName,
                    LastName: customer.LastName,
                    Phone: customer?.Phone,
                    Email: customer.Email,
                    Address: customer.Address,
                    CustomerTypeId: customer.CustomerTypeId,
                }
            });
        } else {
            customerResult = await prisma.customer.create({
                data: {
                    FirstName: customer.FirstName,
                    LastName: customer.LastName,
                    Phone: customer?.Phone,
                    Email: customer.Email,
                    Address: customer.Address,
                    CustomerTypeId: customer.CustomerTypeId,
                },
            });
        }

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

const UpdateCustomer = async (customer: Customer) => {
    try {
        const updatedCustomer = await prisma.customer.update({
            where: {
                CustomerID: customer?.CustomerID
            },
            data: {
                FirstName: customer.FirstName,
                LastName: customer.LastName,
                Phone: customer?.Phone,
                Email: customer.Email,
                Address: customer.Address,
                CustomerTypeId: customer.CustomerTypeId,
            }
        });

        return {
            data: updatedCustomer,
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

const DeleteCustomer = async (customerId: number) => {
    try {
        const result = await prisma.customer.delete({
            where: {
                CustomerID: customerId
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