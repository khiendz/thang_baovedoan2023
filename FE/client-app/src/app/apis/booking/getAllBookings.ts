import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(request: NextRequest) {
  console.log(request);
  const bookings = await prisma.booking.findMany();
  return new NextResponse(JSON.stringify(bookings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
}

