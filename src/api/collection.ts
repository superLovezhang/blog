import request from '../util/request'

export const list = () => request('list')
export const collect = (articleId: number) => request(`/collect/${articleId}`)