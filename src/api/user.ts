import request from '@/util/request.js'

export declare type LoginParams = {
    email: string,
    password: string
}
export const login = (params: LoginParams) => request.get('/user/login', { params })
export declare type UserDTO = {
    email: string
    username: string
    password: string
    verifyCode: string
}
export const register = (data: UserDTO) => request.put('/user/login', { data })