export interface APIResponses<T> {
    status: number,
    message: string,
    data: T
}