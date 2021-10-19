import request from '../util/request'

export const save = () => request.post('/category/save')
export const remove = (categoryId: number) => request.delete(`/category/remove/${categoryId}`)
export const list = () => request('/category/list')
export const listAll = () => request('/category/listAll')
export const categoryHot = () => request('/category/hot')