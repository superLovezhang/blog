import request from '../util/request'

export const comment = () => request('/comment/comment')
export const list = () => request('/comment/list')