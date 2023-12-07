import { NextApiRequest, NextApiResponse } from 'next';
import { Booking, PrismaClient } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetBookings();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const booking = req.body;

        const result = await UpdateBooking(booking);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the book' });
        }

        return res.json({ ...result });
    }  else if (req.method === 'POST') {
        const booking = req.body;

        const result = await AddBooking(booking);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const {bookingId} = req.query;

        const result = await DeleteBooking(parseInt(bookingId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a book' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetBookings = async () => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                Customer: true
            }
        });

        if (bookings) {
            return {
                data: bookings,
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

const AddBooking = async (booking: Booking) => {
    try {
        const bookingResult = await prisma.booking.create({
            data: {
                BookingID: booking.BookingID,
                BookingDate: booking.BookingDate,
                CustomerID: booking?.CustomerID,
                TourID: booking.TourID,
            },
            include: {
                Customer: true
            }
        });

        if (bookingResult) {
            return {
                data: bookingResult,
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

const UpdateBooking = async (booking: Booking) => {
    try {
        const updateBooking = await prisma.booking.update({
            where: {
                BookingID: booking?.BookingID
            },
            data: {
                BookingID: booking.BookingID,
                BookingDate: booking.BookingDate,
                CustomerID: booking?.CustomerID,
                TourID: booking.TourID,
            },
            include: {
                Customer: true
            }
        });

        return {
            data: updateBooking,
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

const DeleteBooking = async (bookingId: number) => {
    try {
        const result = await prisma.booking.delete({
            where: {
                BookingID: bookingId
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