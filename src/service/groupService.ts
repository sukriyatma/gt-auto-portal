import { ServerEndpoint } from "@/consts/server-endpoint"
import server from "@/lib/server"
import { PaginationResponse } from "@/type/pagination-response"

export interface GetListGroupReq {
    keyword?: string, 
    status?: string, 
    ram?: string, 
    cpu?: string;
    updated?: string;
}

interface BotsMeta {
    total: number,
    onlinePercentage: number,
    gems: number
}

export interface BotDetail {
    id: string;
    name: string;
    lvl: number;
    world: string;
    status: string; // CONNECTED, DISCONNECTED, SUSPENDED
    gems: number;
    updatedAt: number;
    createdAt: number;
}

export interface GetListGroupData {
    id: string;
    groupName : string;
    ip: string;
    cpuPercentage : number;
    ramPercentage : number;
    botsMeta: BotsMeta;
    updatedAt: number;
}

export interface GetDetailsGroupData {
    id: string;
    groupName : string; // M
    ip: string;
    cpuPercentage : number;
    ramPercentage : number;
    bots: BotDetail[];
    createdAt: number;
    updatedAt: number;
}

const getListGroup = async (params?: GetListGroupReq | null): Promise<PaginationResponse<GetListGroupData>> => {
    return await server.get(ServerEndpoint.GET_LIST_GROUP, {
        params: params
    }).then(res => res.data);
}

const getDetailsGroup = async (id: string): Promise<GetDetailsGroupData> => {
    const uri = `${ServerEndpoint.GET_DETAILS_GROUP}/${id}`
    return await server.get(uri)
        .then(res => res.data.data);
}

const deleteGroup = async (id: string) => {
    return await server.post(ServerEndpoint.DELETE_GROUP, {
        id: id
    }).then(res => res.data);
}

export { getListGroup, deleteGroup, getDetailsGroup };