import { useCallback, useContext, useEffect, useState } from "react"
import { blogContext } from "../store"
import { objectIsNull } from "./util"
import { CommentDTO } from "../api/types"
import { comment as commentAPI, like as likeAPI } from "../api/comment"

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
export const usePagination = (size: number = 10) => {
    const [pagination, setPagination] = useState({ page: 1, size })
    const nextPage = () => setPagination({ ...pagination, page: pagination.page + 1 })
    return [pagination, nextPage]
}
export const useComment:
    () => [string, (s: string) => void, (params: Partial<CommentDTO>, callback?: () => void) => void, (commentId: string, callback?: () => void) => void]
    = () => {
        const [comment, setComment] = useState('')
        const { state: { user }, dispatch } = useContext(blogContext)

        const publishComment = (params: Partial<CommentDTO>, callback?: () => void) => {
            if (objectIsNull(user)) {
                dispatch({ type: 'OPEN_LOGIN' })
                return
            }
            if (comment.length === 0) {
                alert('请输入评论内容')
                return
            }
            commentAPI({ ...params, content: comment})
                .then(res => {
                    setComment('')
                    callback?.()
                })
                .catch(err => alert(err))
        }
        const likeComment = (commentId: string, callback?: () => void) => {
            likeAPI(commentId)
                .then(() => callback?.())
                .catch(err => alert(err))
        }
        return [comment, setComment, publishComment, likeComment]
}