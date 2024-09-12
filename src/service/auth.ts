import { ServerEndpoint } from "@/consts/server-endpoint"
import server from "@/lib/server"

const loginDiscordProvider = async (accessToken: string) => {
    return await server.post(ServerEndpoint.LOGIN, {
        providers: {
            type: "discord",
            accessToken: accessToken
        }
    })
}

const loginCredential = () => {
    server.post(ServerEndpoint.LOGIN, {
        // TODO: implement login with email and password
    })
}

export {loginDiscordProvider}