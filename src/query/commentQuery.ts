import { useQuery, useMutation, useQueryClient } from 'react-query'
import { comment, like, list, remove } from '../api/comment'
import { CommentPageDTO } from "../api/types"
import { ARTICLE_DETAIL_KEY } from "./articleQuery"

const QUERY_PREFIX = "COMMENT_"
export const COMMENT_LIST_KEY = QUERY_PREFIX + "COMMENT_LIST"

export const useComment = () => {
    const client = useQueryClient()
    return useMutation(comment, {
        onSuccess() {
            client.invalidateQueries(COMMENT_LIST_KEY)
            client.invalidateQueries(ARTICLE_DETAIL_KEY)
        },
        onError(err) {
            alert(err)
        }
    })
}
export const useLikeComment = () => {
    const client = useQueryClient()
    return useMutation(like, {
        onSuccess() {
            client.invalidateQueries(COMMENT_LIST_KEY)
        }
    })
}
export const useCommentList = (params: Partial<CommentPageDTO>) => {
    return useQuery(COMMENT_LIST_KEY, () => list(params))
}
export const useRemoveComment = () => {
    const client = useQueryClient()
    return useMutation(remove, {
        onSuccess() {
            client.invalidateQueries(COMMENT_LIST_KEY)
        },
        onError(err) {
            alert(err)
        }
    })
}