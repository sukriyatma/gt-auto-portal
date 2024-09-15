export const createQueryParams = (params: {[key: string]: any}) => ( 
    Object.entries(params)
    .filter(([key, val]) => val !== undefined && val !== '')
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
)