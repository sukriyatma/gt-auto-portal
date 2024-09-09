export interface ApiResponse<Type> {
    success: boolean;
    errCode: string | "";
    data: Type;    
}