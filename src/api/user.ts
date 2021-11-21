import request from '@/util/request.js'
import { LoginParams, UserDTO, UserPasswordDTO } from "./types"


export const login = (params: LoginParams) => request('/user/login', { params })
export const userInfo = () => request('/user/userInfo')
export const register = (data: UserDTO) => request.put('/user/register', data)
export const sendVerifyCode = (params: { email: string, codeType?: number }) => request.put('/user/verifyCode', null, { params })
export const saveUser = (data: Partial<UserDTO>) => request.post('/user/save', data)
export const updatePassword = (data: Partial<UserPasswordDTO>) => request.post('/user/updatePassword', data)