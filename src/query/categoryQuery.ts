import { useQuery } from 'react-query'
import { listAll } from "../api/category"

const QUERY_PREFIX = "CATEGORY"
const CATEGORY_LIST_KEY = QUERY_PREFIX + "LIST"

export const useCategoryList = () => {
    return useQuery(CATEGORY_LIST_KEY, listAll)
}