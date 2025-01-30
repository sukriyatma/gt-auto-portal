import configuration from "@/config/configuration"
import { loginDiscordProvider } from "@/service/auth"
import { ApiResponse } from "@/type/api-response"
import { LoginResponse } from "@/type/auth"
import "dotenv/config"
import NextAuth, { AuthOptions, User } from "next-auth"
import { JWT } from "next-auth/jwt"
import Discord from "next-auth/providers/discord"


const authOptions: AuthOptions = {
    providers: [
        Discord({
            clientId: process.env.DISCORD_CLIENT_ID || "client-id",
            clientSecret: process.env.DISCORD_CLIENT_SECRET || "client-secret",
        })
    ],
    pages: {},
    callbacks: {
        async signIn({user, account, profile}) {
            const accessTokenDiscord = account?.access_token
            
            if (accessTokenDiscord) {
                const res : ApiResponse<LoginResponse> = await loginDiscordProvider(accessTokenDiscord)
                    .then(res => res.data)
                    .catch(error => null);
                
                if (!res || !res.success) {
                    return false;
                }
                user.accessToken = res.data.accessToken;
                user.user = res.data.user;
                return true;
            }

            return false;
        },
        jwt({token, user}: {token: JWT, user: any}) {
            if (user) {
                token.data = user;
            }
            return token;
        },
        session({session, token, user}) {
            session.user.data = token.data;
            return session;
        },
    },
    secret: configuration().NEXTAUTH_SECRET,
    jwt: {
        maxAge: 60 * 60 * 24 * 7 // in a week
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};