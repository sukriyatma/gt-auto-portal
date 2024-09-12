import { ServerEndpoint } from "@/consts/server-endpoint";
import server from "@/lib/server";


interface DeleteBotReq {
    id: string;
    groupId: string;
}

const deleteBot = async (data: DeleteBotReq) => {
    return await server.post(ServerEndpoint.DELETE_BOT, data)
        .then(res => res.data);
}

export { deleteBot }