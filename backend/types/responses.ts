export type CustomSuccesfullResponse<T> = {
    success: boolean,
    data: T,
    status: number
}

export type CustomErrorResponse = {
    success: boolean,
    error: string,
    details: string | null,
    status: number
}