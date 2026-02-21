import { client } from "@workspace/db/index"
import { NextResponse, NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@workspace/utils/authOption"

export async function POST(req: NextRequest, params: { stadiumId: string }) {

    const body = await req.json();
    const { name, capacity } = body;
    const stadiumId = params.stadiumId;
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") return NextResponse.json({
        message: "Unauthorized access"
    }, { status: 401 });

    try{

        const section = await client.section.create({
            data : {
                name,
                capacity,
                stadiumId
            }
        })

        return NextResponse.json({
            section
        }, { status : 200 });
    }
    catch(err){
        return NextResponse.json({
            message : "Unable to parse request"
        }, { status : 500 });
    }
}