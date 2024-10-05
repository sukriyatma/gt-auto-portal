import axios, { HttpStatusCode } from "axios"
import { getSession, signOut } from "next-auth/react"
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
    });

    axiosInstance.interceptors.response.use(
        async (response) => response,
        async (error) => {
            if (error.response.status === HttpStatusCode.Unauthorized) {
                signOut({ callbackUrl: "/auth/login" });
            }

            return error;
        }
    )

    return axiosInstance;
}

export default server();