import { client } from "@workspace/db/index"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@workspace/utils/authOption"

export async function GET(req : NextRequest){

    const session = await getServerSession(authOptions);

    if(!session || !session.user.id) return NextResponse.json({
        message : "Unautorized access"
    }, { status : 401 })

    try{
        
        const merchandise = await client.merchandise.findMany({
            where : {
                stock : {
                    gt : 0
                }
            }
        })

        if(merchandise.length === 0) return NextResponse.json({
            message : "Not available"
        }, { status : 400});

        return NextResponse.json({
            merchandise
        }, { status : 200 })
    }
    catch(err){
        return NextResponse.json({
            message : "Unable to parse request"
        }, { status : 500})
    }
}