import { client } from "@workspace/db/index"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@workspace/utils/authOption"

export async function GET(req: NextRequest, params: { name: string }) {

    const session = await getServerSession(authOptions);
    const name = params.name;

    if (!session || !session.user || session.user.role !== "admin") return NextResponse.json({
        message: "Unauthorized Access"
    }, { status: 401 })

    try {

        const staff = await client.event.findMany({
            where: {
                name
            },
            include: {
                staff: {
                    include: {
                        user: true,
                        vendors: true
                    }
                }
            }
        })

        if(staff.length === 0) return NextResponse.json({
            message : "No staff is assigned"
        }, { status : 400 })

        return NextResponse.json({
            staff
        }, { status : 200 })
    }
    catch(err){
        return NextResponse.json({
            message : "Unable to parse request"
        }, { status: 500 })
    }
}