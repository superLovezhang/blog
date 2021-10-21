import request from '../util/request'
import { ArticleDTO, ArticlePage } from "./types"

export const articleList = (params?: ArticlePage) => request('/article/list', { params })
export const save = (data: Partial<ArticleDTO>) => request.post('/article/save', data)
export const detail = (articleId: string) => request('/article/' + articleId)
export const hotList = () => request('/hot')