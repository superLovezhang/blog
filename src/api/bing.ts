import request from '../util/request'
import { BasePageDTO } from "./types"

export const list = (page?: Partial<BasePageDTO>) => request('https://api.codelife.cc/bing/list', { params: page })
// export const list = (page?: Partial<BasePageDTO>) => request('/bing/list', { params: page })