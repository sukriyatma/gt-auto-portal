import { ServerEndpoint } from "@/consts/server-endpoint"
import server from "@/lib/server"

interface GetApiKey {
    apiKey: string;
}

const getApiKey = async (): Promise<GetApiKey> => {
    return await server.get(ServerEndpoint.GET_API_KEY)
        .then(res => res.data.data);
}

export { getApiKey };