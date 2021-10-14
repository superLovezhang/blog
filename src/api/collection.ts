import request from '../util/request'

export const list = () => request('/collection/list')
export const collect = (articleId: number) => request.post(`/collection/collect/${articleId}`)