import { client } from "@workspace/db/index"
import { NextResponse, NextRequest } from "next/server"
import jwt from 'jsonwebtoken'
import { userSchema } from "@workspace/utils/inputTypes"

export async function POST(req: NextRequest) {

    const body = await req.json();
    const parsedData = userSchema.safeParse(body);

    if (!parsedData.success) return NextResponse.json({
        message: "Invalid data",
        err: parsedData.error
    }, { status: 401 });

    const { username, password, role } = parsedData.data;

    try {
        const existingUser = await client.user.findUnique({
            where: {
                username
            }
        })

        if (existingUser) return NextResponse.json({
            message: "User already exist"
        }, { status: 401 });

        const user = await client.user.create({
            data: {
                username,
                password,
                role
            }
        })

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET as string);

        return NextResponse.json({
            token
        }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({
            message: err,
        }, { status: 500 });
    }
}