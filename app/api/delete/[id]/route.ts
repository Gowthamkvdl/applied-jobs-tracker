import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


type Params = {
    params: {
        id: string
    }
}

export async function DELETE(request: Request, { params }: Params) {
    try {

        await prisma.job.delete({
            where: {
                id: params.id
            }
        })

        return NextResponse.json(
            { message: "Job deleted" },
            { status: 200 }
        )

    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "Some error occured" }, { status: 500 })

    }
}