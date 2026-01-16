import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params }: Params) {
    try {
        console.log("id",params.id)

        const job = await prisma.job.findUnique({
            where: {
                id: params.id
            }
        })


        if (!job) {
            return NextResponse.json(
                { message: "Job not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { data: job },
            { status: 200 }
        )

    } catch (error) {
        console.log("Error ", error)
        return NextResponse.json(
            { message: "Error getting job application" },
            { status: 500 }
        )
    }
}