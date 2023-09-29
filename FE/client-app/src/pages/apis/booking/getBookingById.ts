import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getBookingById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    const booking = await prisma.booking.findUnique({
      where: { BookingID: parseInt(id as string) },
    });
    if (!booking) {
      res.status(404).json({ error: 'Không tìm thấy booking với ID này' });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi trong quá trình lấy booking' });
  }
}
