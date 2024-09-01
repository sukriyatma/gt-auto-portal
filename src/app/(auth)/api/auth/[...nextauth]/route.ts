import NextAuth, { AuthOptions } from "next-auth"
import Discord from "next-auth/providers/discord"


export const authOptions: AuthOptions = {
    providers: [
        Discord({
            clientId: "1279402016359190580",
            clientSecret: "c_vhkNEeUEVeef2Z4KoxKvlGEVKAWZF1",
        })
    ],
    pages: {}
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};