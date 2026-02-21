import { client } from "@workspace/db/index"
import { NextResponse, NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@workspace/utils/authOption"

export async function POST(req : NextRequest){

    const session = await getServerSession(authOptions);
    
    if(!session || !session.user.id) return NextResponse.json({
        message : "Unauthorized access"
    }, { status : 401 })

    

}