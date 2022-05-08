import { FC } from "react"

import { useCollectArticle } from "../../../query/collectionQuery"

import { ArticleVO, LikeType } from "../../../api/types"
import { useLike } from "../../../query/likeQuery"
import styles from './index.module.less'



interface ShareProps {
    article: ArticleVO
}
const Share: FC<ShareProps> = ({ article }) => {
    const { articleId, collected, liked, collects, likes } = article ?? {}
    const { mutate: collect } = useCollectArticle()
    const { mutate: like } = useLike()
    const scrollToBottom = () => {
        window.scrollTo({ top: document?.querySelector('#root')?.clientHeight ?? 0, behavior: 'smooth' })
    }

    return <div className={styles.share_wrap}>
        <div
            className={`${styles.share_item} ${liked ? styles.collected : ''}`}
            title='点赞'
            onClick={() => like({ id: articleId, likeType: LikeType.ARTICLE })}
        >
            <span>{likes}</span>
            <i className="iconfont icon-like-fill"/>
        </div>
        <div
            className={`${styles.share_item} ${collected ? styles.collected : ''}`}
            title='收藏'
            onClick={() => collect(articleId)}
        >
            <span>{collects}</span>
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