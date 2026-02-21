import { AuthOptions } from "next-auth";
import { providers } from "@workspace/utils/providers";
import { callbacks } from "./callbacks";

export const authOptions : AuthOptions = {

    providers,
    callbacks,

    secret : process.env.NEXTAUTH_SECRET

}