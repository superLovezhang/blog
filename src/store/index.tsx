import React, { Dispatch, FC, ReactElement, useReducer } from 'react'

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
    searchValue?: string
}
const defaultState: State = {
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    loginVisible: false,
    searchValue: ''
}
export const blogContext = React.createContext<{ state: State, dispatch: Dispatch<any> }>({
    state: defaultState,
    dispatch: () => {}
})
const blogReducer = (state: State, action: Action) => {
    const { type, payload } = action
    switch (type) {
        case 'OPEN_LOGIN':
            return { ...state, loginVisible: true }
        case 'CLOSE_LOGIN':
            return { ...state, loginVisible: false }
        case 'SEARCH_ARTICLE':
            return { ...state, searchValue: payload }
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