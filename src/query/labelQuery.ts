import { useQuery } from 'react-query'
import { listAll } from '../api/label'

const QUERY_PREFIX = "LABEL_"
const LABEL_LIST_KEY = QUERY_PREFIX + "LIST"

export const useLabelList = () => {
    return useQuery(LABEL_LIST_KEY, listAll)
}