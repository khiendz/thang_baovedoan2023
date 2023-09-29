import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAllBookings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const bookings = await prisma.booking.findMany();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi trong quá trình lấy danh sách booking' });
  }
}
