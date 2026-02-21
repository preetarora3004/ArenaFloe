import { client } from "@workspace/db/index"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@workspace/utils/authOption"
import { merchandiseSchema } from "@workspace/utils/inputTypes"

export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json(
            { message: "Authentication required" },
            { status: 401 }
        )
    }

    if (session.user.role !== "admin") {
        return NextResponse.json(
            { message: "Forbidden: Admin access only" },
            { status: 403 }
        )
    }

    try {
        const body = await req.json()
        const parsed = merchandiseSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Invalid input", errors: parsed.error },
                { status: 400 }
            )
        }

        const { name, description, price, stock } = parsed.data
        const merchandise = await client.merchandise.create({
            data: {
                name,
                description,
                price,
                stock
            }
        })

        return NextResponse.json(
            { merchandise },
            { status: 201 }
        )

    } catch (error) {
        console.error("Merchandise creation error:", error)

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
