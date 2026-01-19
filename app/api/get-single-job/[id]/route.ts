import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteParams = Promise<{
  id: string;
}>;

export async function GET(
  request: Request,
  { params }: { params: RouteParams }
) {
  try {
    const { id } = await params;

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: job }, { status: 200 });
  } catch (error) {
    console.error("Error getting job:", error);
    return NextResponse.json(
      { message: "Error getting job application" },
      { status: 500 }
    );
  }
}
