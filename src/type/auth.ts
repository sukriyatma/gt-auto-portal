
export interface LoginResponse {
    accessToken: string | null
    user: {
        email: string | null,
        name: string | null,
        image: string | null
    }
}