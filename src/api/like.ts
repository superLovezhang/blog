import request from '../util/request'
import { LikeType } from "./types"

export const like = (params: { id: string, likeType: LikeType }) => request.post(`/like/${params.id}?likeType=${params.likeType}`)