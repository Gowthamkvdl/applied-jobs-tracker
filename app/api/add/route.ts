import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const job = await prisma.job.create({
      data: body,
    });

    return NextResponse.json(
      {
        message: "Job created successfully",
        data: job,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create job error:", error);

    return NextResponse.json(
      { message: "Failed to create job" },
      { status: 500 }
    );
  }
}
