import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  console.log(request);
  const bookings = await prisma.booking.findMany();
  return new NextResponse(JSON.stringify(bookings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
}
