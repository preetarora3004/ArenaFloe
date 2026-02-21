import { CallbacksOptions, DefaultSession, Session } from "next-auth";

export const callbacks: Partial<CallbacksOptions> = {

    async jwt({ token, user }) {

        if (user) {
            return {
                ...token,
                id: user.id,
                username: user.username
            }
        }
        return token
    },

    async session({ session, user }): Promise<Session | DefaultSession> {

        if (session.user || session) {

            return {
                ...session,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            }
        }
        return session;
    }
} 