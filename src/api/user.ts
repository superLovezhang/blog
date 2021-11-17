import request from '@/util/request.js'
import { LoginParams, UserDTO } from "./types"


export const login = (params: LoginParams) => request('/user/login', { params })
export const userInfo = () => request('/user/userInfo')
export const register = (data: UserDTO) => request.put('/user/register', data)
export const sendVerifyCode = (email: string) => request.put('/user/verifyCode', null, { params: { email } })
export const saveUser = (data: Partial<UserDTO>) => request.post('/user/save', data)