import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { client } from "@workspace/db/index"
import { User } from "next-auth";

export const providers = [

    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "username", type: "text", placeholder: "Enter your username" },
            password: { label: "password", type: "password", placeholder: "****" }
        },

        async authorize(credentials: Record<string, string> | null | undefined) {

            const { username, password } = credentials ?? {};
            if (!username || !password) return null;

            const user = await client.user.findUnique({
                where : {
                    username,
                    password
                }
            })

            if(!user) return null;

            const payload = {
                id : user.id,
                username,
                role : user.role
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET as string);

            return {
                token,
                id : user.id,
                username : user.username,
                role : user.role
            } as User
        }
    })

]