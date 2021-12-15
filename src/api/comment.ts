import request from '../util/request'
import { CommentDTO, CommentPageDTO } from './types'

export const comment = (data: Partial<CommentDTO>) => request.put('/comment', data)
export const list = (params: Partial<CommentPageDTO>) => request('/comment/list', { params })
export const like = (commentId: string) => request.post('/comment/like/' + commentId )
export const remove = (commentId: string) => request.delete('/comment/remove/' + commentId )
