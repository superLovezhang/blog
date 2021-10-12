import request from '../util/request'
import {ArticlePage} from "./types"

export const articleList = (params: ArticlePage | undefined) => request('/article/list', { params })
export const save = () => request.post('/article/save', {})
export const detail = (articleId: number) => request('/article/' + articleId)
export const hotList = () => request('/hot')