import request from '@/util/request.js'
import { LoginParams, UserDTO } from "./types"


export const login = (params: LoginParams) => request.get('/user/login', { params })
export const register = (data: UserDTO) => request.put('/user/register', data)