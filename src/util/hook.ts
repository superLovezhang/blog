import { useCallback, useEffect, useState } from "react"
import { objectIsNull } from "./util"

export const useTheme: () => [string, () => void, () => void] = () => {
    const [theme, setTheme] = useState<string>(window.localStorage.getItem("theme") ?? 'light')

    const setStorageTheme = (theme: string) => {
        window.localStorage.setItem('theme', theme)
        //@ts-ignore
        document.querySelector('html').className = theme
    }
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        setStorageTheme(newTheme)
    }

    return [theme, toggleTheme, () => setStorageTheme(theme)]
}
export const useScroll = () => {
    const [visible, setVisible] = useState(false)

    const scrollDistance = () => window.scrollY
    const callback = useCallback((e: Event) => {
        setVisible(scrollDistance() > 100)
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', callback)
        return () => window.removeEventListener('scroll', callback)
        // eslint-disable-next-line
    }, [])

    return visible
}
export const useUser = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const logout = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user')
        setUser({})
        alert('登出成功')
    }
    const login = (user: any = {}, token: string) => {
        window.localStorage.setItem('user', JSON.stringify(user))
        window.localStorage.setItem('token', token)
        alert('登陆成功')
        window.location.reload()
    }
    return [user, login, logout, !objectIsNull(user)]
}