import { useQuery, useMutation } from 'react-query'
import { articleList, detail, hotList, save } from '../api/article'
import { ArticlePage } from "../api/types"

export const QUERY_PREFIX = "ARTICLE_"
export const ARTICLE_HOT_LIST_KEY = QUERY_PREFIX + "HOT_LIST"
export const ARTICLE_DETAIL_KEY = QUERY_PREFIX + "DETAIL"
export const ARTICLE_LIST_KEY = QUERY_PREFIX + "LIST"
export const useArticleHotList = () => {
    return useQuery(ARTICLE_HOT_LIST_KEY, hotList)
}
export const useArticleDetail = (articleId: string) => {
    return useQuery(ARTICLE_DETAIL_KEY, () => detail(articleId), {
        enabled: !!articleId
    })
}
export const useArticleList = (params?: ArticlePage) => {
    return useQuery(ARTICLE_LIST_KEY, () => articleList(params))
}
export const useSaveArticle = () => {
    return useMutation(save, {
        onSuccess() {}
    })
}