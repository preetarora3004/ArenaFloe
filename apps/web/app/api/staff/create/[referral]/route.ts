import { client } from "@workspace/db/index"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@workspace/utils/authOption"

export async function POST(req: NextRequest, params: {
    referral: string
}) {

    const { referral } = params;
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "user" || !session.user.id) {
        return NextResponse.json({
            messsage: "Unauthorized access"
        }, { status: 401 });
    }

    try {

        const existReferral = await client.referal.findUnique({
            where: {
                token: referral,
                userId: session.user.id
            }
        })

        if (existReferral?.role === "vendors") {

            try {
                const staff = await client.staff.create({
                    data: {
                        userId: session.user.id,
                        type: "vendors"
                    }
                })

                const vendor = await client.vendors.create({
                    data : {
                        staffId : staff.id
                    }
                })

                return NextResponse.json({
                    message : "Created Successfully"
                }, { status : 200 })
            }
            catch(err){
                return NextResponse.json({
                    message : "Unable to parse Request"
                }, { status : 500 })
            }
        }

        return NextResponse.json({
            message : "Referal not found"
        }, { status : 401 })
    }
    catch (err) {
        return NextResponse.json({
            message: "Unable to parse request"
        }, { status: 500 })
    }
}