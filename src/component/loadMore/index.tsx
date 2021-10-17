import { FC } from "react"
import styles from './index.module.less'

interface LoadMoreProps {
    hasMore?: boolean
    loadMore?: () => void
}
const LoadMore: FC<LoadMoreProps> = ({ hasMore, loadMore }) => {
    return <div className={styles.load_more_wrap}>
        {hasMore ? <button onClick={loadMore}>加载更多...</button> : <div className={styles.touch_down}>
            <span>我是有底线的</span>
            <div className={styles.line}/>
        </div>}
    </div>
}

export default LoadMore