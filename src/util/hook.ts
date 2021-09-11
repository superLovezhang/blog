import { useState } from "react"

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