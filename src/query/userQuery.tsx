import { useContext } from "react"
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { login, userInfo, register, sendVerifyCode, saveUser } from '../api/user'
import { blogContext } from "../store"

const USER_PREFIX_KEY = 'USER_'
const USER_INFO_KEY = USER_PREFIX_KEY + 'USER_INFO'
export const useRegister = () => {
    return useMutation(register, {
        onError: (err) => {
            alert(err)
        }
    })
}
export const useLogin = () => {
    const client = useQueryClient()
    const { dispatch } = useContext(blogContext)
    return useMutation(login, {
        onSuccess(data: any) {
            const { token } = data.data ?? {}
            window.localStorage.setItem('token', token)
            client.invalidateQueries(USER_INFO_KEY)
            dispatch({ type: 'CLOSE_LOGIN' })
            alert('登陆成功')
        },
        onError: (err) => alert(err)
    })
}
export const useUserInfo = () => {
    return useQuery([USER_INFO_KEY], userInfo, {
        enabled: true
    })
}
export const useVerifyCode = () => {
    return useMutation(sendVerifyCode, {
        onError: (err) => alert(err)
    })
}
export const useSaveUser = () => {
    return useMutation(saveUser, {
        onError(err) {
            alert(err)
        }
    })
}