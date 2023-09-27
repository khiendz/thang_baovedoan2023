import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const contacts = await prisma.contact.findMany();
    return new NextResponse(JSON.stringify(contacts), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
  }
  