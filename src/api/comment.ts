import request from '../util/request'
import { CommentDTO } from './types'

export const comment = (data: CommentDTO) => request.put('/comment', data)
export const list = () => request('/comment/list')