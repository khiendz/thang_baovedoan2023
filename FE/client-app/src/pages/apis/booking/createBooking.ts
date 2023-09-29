import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Booking } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createBooking(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { CustomerID, TourID, BookingDate } = req.body;
    try {
      const booking = await prisma.booking.create({
        data: {
          BookingID: 1,
          CustomerID,
          TourID,
          BookingDate: new Date(BookingDate), // Chuyển đổi chuỗi thành kiểu Date
        },
      });
      res.status(201).json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi trong quá trình tạo booking' });
    }
  } else {
    res.status(405).json({ error: 'Method không được hỗ trợ' });
  }
}
