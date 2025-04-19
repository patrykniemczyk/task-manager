import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { newUser } from "@/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (user?.email) {
                await newUser(user.email);
            }
            return true;
        },
    },
});
