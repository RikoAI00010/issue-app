// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import { DateTime } from "next-auth/providers/kakao"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            role: AccounstringtForm,
            firstName: string,
            lastName: string,
            image: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        role: AccounstringtForm,
        firstName: string,
        lastName: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: AccounstringtForm,
        firstName: string,
        lastName: string,
    }
}