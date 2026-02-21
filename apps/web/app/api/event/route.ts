import { client } from "@workspace/db/index"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "@workspace/utils/authOption";

export async function GET(req : NextRequest){

    const body = await req.json();
    const { name } = body;
    const session = await getServerSession(authOptions);

    if(!session || !session.user) return NextResponse.json({
        message : "Unauthorized access"
    }, { status : 401 })

    try{
        const event = await client.event.findUnique({
            where : {
                name
            }
        })

        if(!event) return NextResponse.json({
            message : "Event not found"
        }, { status : 404 });

        return NextResponse.json({
            event
        }, { status : 200 })
    }
    catch(err){
        return NextResponse.json({
            message : "Unable to parse request"
        }, { status : 500 })
    }
}