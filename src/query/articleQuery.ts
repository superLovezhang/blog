import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useHistory } from "react-router-dom"
import { articleList, detail, ensurePermissionDetail, hotList, save, remove } from '../api/article'
import { ArticlePage } from "../api/types"

export const QUERY_PREFIX = "ARTICLE_"
export const ARTICLE_HOT_LIST_KEY = QUERY_PREFIX + "HOT_LIST"
export const ARTICLE_DETAIL_KEY = QUERY_PREFIX + "DETAIL"
export const ARTICLE_LIST_KEY = QUERY_PREFIX + "LIST"
export const ARTICLE_PERMISSION_DETAIL = QUERY_PREFIX + "PERMISSION_DETAIL"
export const useArticleHotList = () => {
    return useQuery(ARTICLE_HOT_LIST_KEY, hotList, {
        onError(err) {
            alert(err)
        }
    })
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
            alert('发布成功，请等待管理员审核')
            history.push('/')
            const processedDrafts = JSON.parse(window.localStorage.getItem('drafts') ?? '[]')
                .filter((item: any) => item.title !== params.articleName)
            window.localStorage.setItem('drafts', JSON.stringify(processedDrafts))
        }
    })
}

export const usePermissionDetail = (articleId: string) => {
    return useQuery(ARTICLE_PERMISSION_DETAIL, () => ensurePermissionDetail(articleId), {
        enabled: !!articleId,
        onError(err) {
            alert(err)
        }
    })
}
export const useDeleteArticle = () => {
    let client = useQueryClient()
    return useMutation(remove, {
        onSuccess: () => {
            alert('删除成功！')
            client.refetchQueries(ARTICLE_LIST_KEY)
        },
        onError: (err) => {
            alert(err)
        }
    })
}