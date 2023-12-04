export interface User{
    id: number,
    full_name: string,
    mobile_number: number,
    email: string,
    role_id: number,
    occupation?: string,
    profile_image?: string,
    gender?: string,
    city?:string,
    state?:string,
    country?:string
}