import styles from './index.module.less'

const Share = () => {
    const scrollToBottom = () => {
        window.scrollTo({ top: document?.querySelector('#root')?.clientHeight ?? 0, behavior: 'smooth' })
    }

    return <div className={styles.share_wrap}>
        <div className={`${styles.share_item}`} title='收藏'>
            <i className="iconfont icon-collected"></i>
        </div>
        <div
            className={`${styles.comment} ${styles.share_item}`}
            onClick={scrollToBottom}
            title='评论'
        >
            <i className="iconfont icon-comment_fill_light"></i>
        </div>
        <span>分享</span>
        <div className={`${styles.weibo} ${styles.share_item}`} title='微博'>
            <i className="iconfont icon-weibo"></i>
        </div>
        <div className={`${styles.zone} ${styles.share_item}`} title='QQ空间'>
            <i className="iconfont icon-qzone"></i>
        </div>
    </div>
}
export default Share