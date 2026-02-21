import { client } from "@workspace/db/index"
import { NextResponse, NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@workspace/utils/authOption"

export async function POST(req: NextRequest, params: {
    seatId: string,
    eventId: string
}
) {

    const body = await req.json();
    const { startTime, endTime, qrCode, price } = body;
    const { seatId, eventId } = params;
    const session = await getServerSession(authOptions);
    const fees = Number(price);

    if (!session || !session.user || !session.user.id) return NextResponse.json({
        message: "Unauthorized access"
    }, { status: 401 })

    const userId = session.user.id;

    try {

        const ticket = await client.ticket.create({
            data: {
                startTime,
                userId,
                endTime,
                qrCode,
                eventId,
                seatId,
                price: fees
            }
        })

        return NextResponse.json({
            ticket
        }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({
            messsage: "Unable to parse request"
        }, { status: 500 })
    }
}