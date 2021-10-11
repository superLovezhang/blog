import request from '../util/request'

export const articleList = () => request('/article/list', { params: {} })
export const save = () => request.post('/article/save', {})
export const detail = (articleId: number) => request('/article/' + articleId)
export const hotList = () => request('/hot')