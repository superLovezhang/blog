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
    const { type } = action
    switch (type) {
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