import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }

    const job = await prisma.job.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Job updated successfully", data: job },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update job error:", error);

    return NextResponse.json(
      { message: "Failed to update job" },
      { status: 500 }
    );
  }
}
