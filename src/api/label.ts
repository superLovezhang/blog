import request from '../util/request'

export const save = () => request.post('/label/save')
export const remove = (labelId: number) => request.delete(`/label/remove/${labelId}`)
export const list = () => request('/label/list')
export const listAll = () => request('/label/listAll')
export const hot = () => request('/label/hot')