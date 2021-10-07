import request from '@/util/request.js'

export const login = (email: string, password: string) => request.get('/user/login', { params: { email, password }})
interface userDTO {
    email: string
    username: string
    password: string
    verifyCode: string
}
export const register = (data: userDTO) => request.put('/user/login', { data })