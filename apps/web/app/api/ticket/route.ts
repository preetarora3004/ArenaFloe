import { client } from "@workspace/db/index"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@workspace/utils/authOption"

export async function GET(req : NextRequest){

    const session = await getServerSession(authOptions);

    if(!session || !session.user) return NextResponse.json({
        message : "Unauthorized access"
    }, { status : 401 });

    const userId = session.user.id;

    try {
        const ticket = await client.ticket.findMany({
            where : {
                userId
            }
        })

        if(ticket.length === 0) return NextResponse.json({
            message : "unable to find ticket"
        }, { status : 404 })

        return NextResponse.json({
            ticket
        }, { status : 200 })
    }
    catch(err){
        return NextResponse.json({
            message : "Unable to parse request"
        }, { status : 500 })
    }
}