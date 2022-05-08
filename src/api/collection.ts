import request from '../util/request'
import { BasePageDTO } from './types'

export const list = (params?: BasePageDTO) => request('/collection/list', { params })
export const collect = (articleId: string) => request.post(`/collection/collect/${articleId}`)