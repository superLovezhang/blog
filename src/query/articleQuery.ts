import { useQuery, useMutation } from 'react-query'
import { useHistory } from "react-router-dom"
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
export const useArticleList = (params?: ArticlePage, enabled: boolean = true) => {
    return useQuery([ARTICLE_LIST_KEY, params],
        (context) => articleList(context.queryKey[1] as ArticlePage | undefined),
        { enabled }
        )
}
export const useSaveArticle = () => {
    const history = useHistory()
    return useMutation(save, {
        onSuccess(_, params: any) {
            alert('发布成功')
            history.push('/')
            const processedDrafts = JSON.parse(window.localStorage.getItem('drafts') ?? '[]')
                .filter((item: any) => item.title !== params.articleName)
            window.localStorage.setItem('drafts', JSON.stringify(processedDrafts))
        }
    })
}