import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    console.log(request);
    const customer = await prisma.customer.findMany();
    return new NextResponse(JSON.stringify(customer), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });0
  }
  