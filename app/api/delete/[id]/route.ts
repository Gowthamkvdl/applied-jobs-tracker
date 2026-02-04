import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.job.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(
      { message: "Job deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "Some error occurred" },
      { status: 500 }
    );
  }
}
