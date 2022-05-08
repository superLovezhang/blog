import { useMutation, useQueryClient } from 'react-query'
import { like } from '../api/like'
import { LikeType } from '../api/types'
import { ARTICLE_DETAIL_KEY } from "./articleQuery"
import {COMMENT_LIST_KEY} from "./commentQuery"


export const useLike = () => {
    const client = useQueryClient()
    return useMutation(like, {
        onSuccess(data: any, params: { likeType: LikeType }) {
            if (params.likeType === LikeType.ARTICLE) {
                client.invalidateQueries(ARTICLE_DETAIL_KEY)
            } else {
                client.invalidateQueries(COMMENT_LIST_KEY)
            }
        },
        onError(err) {
            alert(err)
        }
    })
}