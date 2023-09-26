import prisma from "@/lib/prisma";
import { compare } from "bcrypt"
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user.hashedPassword) {
                    throw new Error('Email does not exist')
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword)

                if (!isCorrectPassword) {
                    throw new Error('Incorrect password')
                }

                return user
            }
        }
        )
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    }
}

export default NextAuth(authOptions);
