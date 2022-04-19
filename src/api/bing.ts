import request from '../util/request'
import { BasePageDTO } from "./types"

export const list = (page?: Partial<BasePageDTO>) => request('https://api.codelife.cc/bing/list', { params: page, headers: { version: '1.2.22' } })
export const todayWallPaper = () => request('/bing')