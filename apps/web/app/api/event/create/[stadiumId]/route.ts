import { client } from "@workspace/db/index"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "@workspace/utils/authOption";

export async function POST(req : NextRequest, params: {stadiumId : string}){

    const body = await req.json();
    const { name } = body;
    const stadiumId = params.stadiumId;
    const session = await getServerSession(authOptions);

    if(!session || session.user.role !== "admin") return NextResponse.json({
        message : "unauthorized access"
    }, { status : 403 });

    try {
        const existingStadium = await client.event.findUnique({
            where : {
                name
            }
        })

        if(existingStadium) return NextResponse.json({
            message : "already exist"
        }, { status : 401 });

        const event = await client.event.create({
            data : {
                name,
                stadiumId
            }
        })

        return NextResponse.json({
            event
        }, { status : 200 })
    }
    catch(err){
        return NextResponse.json({
            message : "Could not parse request",
            error : err
        }, { status : 500 });
    }
}