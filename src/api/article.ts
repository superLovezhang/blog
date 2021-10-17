import request from '../util/request'
import {ArticlePage} from "./types"

export const articleList = (params?: ArticlePage) => request('/article/list', { params })
export const save = () => request.post('/article/save', {})
export const detail = (articleId: string) => request('/article/' + articleId)
export const hotList = () => request('/hot')