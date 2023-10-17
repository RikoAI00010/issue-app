import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client";

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const user = { id: "1", name: "J Smith", email: "jsmith@example.com", role: 'user' }
    
          if (user) {
            return user
          } else {
            return null
          }
        }
      })
    ],
    pages: {
      signIn: "/signin",
    },
    session:{
      strategy: "jwt"
    },
    callbacks: {
      jwt({ token, user }) {
        if(user) token.role = user.role
        return token
      },
      session({ session, token }) {
        session.user.role = token.role
        return session
      }
    }
}