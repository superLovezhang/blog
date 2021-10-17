import { useQuery, useMutation, useQueryClient } from 'react-query'
import { collect, list } from '../api/collection'
import { ARTICLE_DETAIL_KEY } from "./articleQuery"

const QUERY_PREFIX = "SHARE_"
const COLLECTION_LIST_KEY = QUERY_PREFIX + "COLLECTION_LIST"

export const useCollectArticle = () => {
    const client = useQueryClient()
    return useMutation(collect, {
        onSuccess() {
            client.invalidateQueries(ARTICLE_DETAIL_KEY)
        }
    })
}
export const useArticleList = () => {
    return useQuery(COLLECTION_LIST_KEY, list)
}