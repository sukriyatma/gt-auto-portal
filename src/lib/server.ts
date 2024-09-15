import axios from "axios"
import { getSession } from "next-auth/react"
import "dotenv/config"

const server = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_HOST,
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