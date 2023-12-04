import { NextApiRequest, NextApiResponse } from 'next';
import { Payment, PrismaClient } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetPayment();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const payment = req.body;

        const result = await UpdatePayment(payment);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the payment' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const payment = req.body;

        const result = await AddPayment(payment);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new payment' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { paymentId } = req.query;

        const result = await DeletePayment(parseInt(paymentId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a payment' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetPayment = async () => {
    try {
        const paymentResult = await prisma.payment.findMany({
            include: {
                Booking: {
                    include: {
                        Customer: true,
                        Tour: true
                    }
                }
            }
        });

        if (paymentResult) {
            return {
                data: paymentResult,
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

const AddPayment = async (payment: Payment) => {
    try {
        const paymentResult = await prisma.payment.create({
            data: {
               BookingID: payment.BookingID,
               PaymentDate: payment.PaymentDate,
               Amount: payment.Amount
            },
            include: {
                Booking: {
                    include: {
                        Customer: true,
                        Tour: true
                    }
                }
            }
        });

        return {
            data: paymentResult,
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

const UpdatePayment = async (payment: Payment) => {
    try {
        const updatePayment = await prisma.payment.update({
            where: {
                PaymentID: payment?.PaymentID
            },
            data: {
                BookingID: payment.BookingID,
                PaymentDate: payment.PaymentDate,
                Amount: payment.Amount
            },
            include: {
                Booking: {
                    include: {
                        Customer: true,
                        Tour: true
                    }
                }
            }
        });

        return {
            data: updatePayment,
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

const DeletePayment = async (paymentId: number) => {
    try {
        const result = await prisma.payment.delete({
            where: {
                PaymentID: paymentId
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