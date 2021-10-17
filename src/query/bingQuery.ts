import { useQuery } from 'react-query'
import { list } from '../api/bing'
import { BasePageDTO } from "../api/types"

const QUERY_PREFIX = "BING_"
const BING_LIST_KEY = QUERY_PREFIX + "BING_LIST"

export const useBingList = (params?: Partial<BasePageDTO>) => {
    return useQuery([BING_LIST_KEY, params], (context) => {
        const [, pageParam] = context.queryKey
        return list(pageParam as BasePageDTO)
    })
}