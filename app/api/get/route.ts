import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
  
    return NextResponse.json(
      { data: jobs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);

    return NextResponse.json(
      { message: "Failed to get jobs" },
      { status: 500 }
    );
  }
}
