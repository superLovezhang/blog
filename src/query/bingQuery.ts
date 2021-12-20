import { useQuery } from 'react-query'
import { list, todayWallPaper } from '../api/bing'
import { BasePageDTO } from "../api/types"

const QUERY_PREFIX = "BING_"
const BING_LIST_KEY = QUERY_PREFIX + "BING_LIST"
const BING_TODAY_KEY = QUERY_PREFIX + "T0DAY_PAPER"

export const useBingList = (params?: Partial<BasePageDTO>) => {
    return useQuery([BING_LIST_KEY, params], (context) => {
        const [, pageParam] = context.queryKey
        return list(pageParam as BasePageDTO)
    })
}
export const useTodayPaper = () => {
    return useQuery([BING_TODAY_KEY], todayWallPaper)
}