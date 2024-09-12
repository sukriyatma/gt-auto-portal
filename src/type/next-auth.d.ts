import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            data: {
                accessToken: string | null,
                user: {
                    email: string | null,
                    name: string | null,
                    image: string | null
                }
            } | null,
            errCode: string | "",
            success: boolean;
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        accessToken: string | null,
        user: {
            email: string | null,
            name: string | null,
            image: string | null
        }
    }
}



declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        data: {
            accessToken: string | null,
            user: {
                email: string | null,
                name: string | null,
                image: string | null
            }
        }
    }
}