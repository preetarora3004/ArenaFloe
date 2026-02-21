import { client } from "@workspace/db/index"
import { NextResponse, NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@workspace/utils/authOption"

export async function GET(req: NextRequest) {

    const body = await req.json();
    const { name } = body;
    const session = await getServerSession(authOptions);

    if(!session?.user || session.user.role !== "admin") return NextResponse.json({
        message : "Unauthorized access"
    }, { status: 401 })

    try{
        const section = await client.section.findMany({
            where : {
                name
            },
            include: {
                seats : true
            }
        })

        if(section.length === 0) return NextResponse.json({
            message : "Unable to find section"
        }, { status : 400 })

        return NextResponse.json({
            section
        }, { status : 200 })
    }
    catch(err){
        return NextResponse.json({
            message : "Unable to parse request"
        }, { status : 500 })
    }
}