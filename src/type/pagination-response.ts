export interface PaginationResponse<Type> {
    data: Type[],
    pagination: {
        nextPage: string | null
    }
}