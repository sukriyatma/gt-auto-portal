import { configuration } from "@/config/configuration"
import axios from "axios"
import { getSession } from "next-auth/react"

const server = () => {
    const axiosInstance = axios.create({
        baseURL: configuration.BACKEND_HOST,
    })

    axiosInstance.interceptors.request.use(async (req)=> {
        const session = await getSession();
        
        if (session) {
            req.headers.Authorization = `Bearer ${session.user.data?.accessToken}`;
        }
        return req;
    })

    return axiosInstance;
}

export default server();