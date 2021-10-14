import {FC, useState} from "react"

import { collect } from '../../api/collection'
import styles from './index.module.less'

interface ShareProps {
    articleId: number
    collected: boolean
}
const Share: FC<ShareProps> = ({ articleId, collected }) => {
    const [isCollected, setIsCollected] = useState(collected)
    const scrollToBottom = () => {
        window.scrollTo({ top: document?.querySelector('#root')?.clientHeight ?? 0, behavior: 'smooth' })
    }
    const collectArticles = () => {
        collect(articleId)
            .then(res => {
                setIsCollected(!isCollected)
            })
            .catch(err => alert(err))
    }

    return <div className={styles.share_wrap}>
        <div
            className={`${styles.share_item} ${isCollected ? styles.collected : ''}`}
            title='收藏'
            onClick={collectArticles}
        >
            <i className="iconfont icon-collected"/>
        </div>
        <div
            className={`${styles.comment} ${styles.share_item}`}
            onClick={scrollToBottom}
            title='评论'
        >
            <i className="iconfont icon-comment_fill_light"/>
        </div>
        <span>分享</span>
        <div className={`${styles.weibo} ${styles.share_item}`} title='微博'>
            <i className="iconfont icon-weibo"/>
        </div>
        <div className={`${styles.zone} ${styles.share_item}`} title='QQ空间'>
            <i className="iconfont icon-qzone"/>
        </div>
    </div>
}
export default Share