import request from '@/util/request.js'
import { LoginParams, UserDTO } from "./types"


export const login = (params: LoginParams) => request('/user/login', { params })
export const userInfo = () => request('/user/userInfo')
export const register = (data: UserDTO) => request.put('/user/register', data)