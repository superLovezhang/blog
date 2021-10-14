import React, {Dispatch, FC, ReactElement, useReducer } from 'react'

interface BlogProviderProps {
    children?: ReactElement
}
interface Action {
    type: string
    payload?: any
}
interface State {
    user: { [key: string]: string }
    loginVisible: boolean
}
const defaultState: State = {
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    loginVisible: false
}
export const blogContext = React.createContext<{ state: State, dispatch: Dispatch<any> }>({
    state: defaultState,
    dispatch: () => {}
})
const blogReducer = (state: State, action: Action) => {
    const { type, payload } = action
    switch (type) {
        case 'LOGIN':
            window.localStorage.setItem('user', JSON.stringify(payload.user))
            window.localStorage.setItem('token', payload.token)
            alert('登陆成功')
            return { ...state, user: payload.user, loginVisible: false }
        case 'LOGOUT':
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('user')
            return { ...state, user: {} }
        case 'OPEN_LOGIN':
            return { ...state, loginVisible: true }
        case 'CLOSE_LOGIN':
            return { ...state, loginVisible: false }
    }
    return state
}

const BlogProvider: FC<BlogProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, defaultState)

    return <blogContext.Provider value={{ state, dispatch }}>
        {children}
    </blogContext.Provider>
}

export default BlogProvider