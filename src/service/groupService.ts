import { ServerEndpoint } from "@/consts/server-endpoint"
import server from "@/lib/server"

export interface GetListGroupReq {
    keyword?: string, 
    status?: string, 
    ram?: string, 
    cpu?: string
}

interface BotsMeta {
    total: number,
    onlinePercentage: number,
    gems: number
}

export interface GetListGroupRes {
    data: [
        {
            id: string,
            name : string,
            ip: string,
            cpuPercentage : number,
            ramPercentage : number,
            botsMeta: BotsMeta
            updatedAt: number 
        }
    ],
    pagination: {
        nextPage: string | null
    }
}

const getListGroup = async (params?: GetListGroupReq | null): Promise<GetListGroupRes> => {
    return await server.get(ServerEndpoint.GET_LIST_GROUP, {
        params: params
    }).then(res => res.data);
}

const deleteGroup = async (id: string) => {
    return await server.post(ServerEndpoint.DELETE_GROUP, {
        id: id
    }).then(res => res.data);
}

export { getListGroup, deleteGroup };