import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const { phoneNumber } = req.query; 
        if (!phoneNumber)
            return res.status(400).json({ error: 'Invalid phone number' });
        const result = await GetPaymentByPhone(phoneNumber.toString());

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetPaymentByPhone = async (phoneNumber: string) => {
    try {
        const payments = await prisma.payment.findMany({
            where: {
                Booking: {
                    Customer: {
                        Phone: phoneNumber
                    }
                }
            }, 
            include: {
                Booking: {
                    include: {
                        Customer: true
                    }
                }
            }
        });

        if (payments) {
            return {
                data: payments,
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

export default apiHandler(handler,["GET"]);