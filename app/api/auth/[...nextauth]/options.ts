import type { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";

export const options: NextAuthOptions = {
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
        async authorize(credentials, req):Promise<any> {
          // if (!credentials?.username || !credentials.password) {
          //   return null
          // }
          
         try {
            const user = await prisma.user.findFirst({
              where:{
                email: 'Test@test.pl'
              },
              include:{
                role: true
              }
            })

            
            
            if (user) {
              return user
            } else {
              return null
            }            
         } catch (error) {
          console.log(error);
          
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
        if(user) {
          token.role = user.role.name,
          token.firstName = user.firstName,
          token.lastName = user.lastName,
          token.image = user.image
        }
        return token
      },
      session({ session, token }) {
        session.user.role = token.role,
        session.user.firstName = token.firstName,
        session.user.lastName = token.lastName
        return session
      }
    }
}