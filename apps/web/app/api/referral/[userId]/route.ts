import { client } from "@workspace/db/index"
import { NextResponse, NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@workspace/utils/authOption"

export async function POST(req: NextRequest, params: { userId: string }) {

    const body = await req.json();
    const token = body;
    const employeeId = params.userId;
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") return NextResponse.json({
        message: "Unauthorized access"
    }, { status: 401 });

    try {

        const referral = await client.referal.create({
            data: {
                token,
                userId: employeeId
            }
        })

        return NextResponse.json({
            referral
        }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({
            message: "Unable to parse request"
        }, { status: 500 })
    }
}