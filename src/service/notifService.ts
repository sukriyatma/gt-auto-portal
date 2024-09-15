import { BotActivity } from "@/consts/bot-activity";
import { BotStatus } from "@/consts/bot-status";
import { ServerEndpoint } from "@/consts/server-endpoint"
import server from "@/lib/server"
import { ApiResponse } from "@/type/api-response";
import { PaginationResponse } from "@/type/pagination-response";


export interface NotificationRes {
    notificationId: string;
    type: BotStatus | BotActivity; // "DISCONNECTED" "FOUND_NUKED_WORLD"
    botId: string;
    groupId: string;
    title: string;
    description: string;
    createdAt: number;
    updatedAt: number | null;
    readAt: number | null;
}

const getListnotif = async (next?: string): Promise<ApiResponse<PaginationResponse<NotificationRes>>> => {
    return await server.get(ServerEndpoint.GET_NOTIFICATION, {
        params: {
            next: next
        }
    }).then(res => res.data);
}

const readNotif = async (id?: string) : Promise<void> => {
    return await server.post(ServerEndpoint.READ_NOTIFICATION, {
        id: id
    }).then(res => res.data);
}

export { getListnotif, readNotif }