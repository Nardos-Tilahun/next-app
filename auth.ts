import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "@/prisma/client";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/schema";
import argon2 from 'argon2';
import { ZodError } from "zod";


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google,
        Credentials({
            credentials: {
                email: { label: "email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            authorize: async (credentials) => {

                const result = signInSchema.safeParse(credentials)

                if (!result.success) {
                    return null;
                }

                const { email, password } = result.data;

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: email
                        }
                    })

                    if (!user) {
                        throw new Error("user not found")
                    }


                    const isMatch = await argon2.verify(user.password!, password);

                    if (!isMatch) {
                        throw new Error("User not found.")
                    }

                    return user;
                } catch (error) {
                    if (error instanceof ZodError) {
                        return null
                    }
                    return null;
                }
            }
        })
    ],

    session: {
        strategy: "jwt",
    }
}) 