import styles from './index.module.less'

const Share = () => {
    return <div className={styles.share_wrap}>
        <div className={`${styles.comment} ${styles.share_item}`}>
            <i className="iconfont icon-comment_fill_light"></i>
        </div>
        <span>分享</span>
        <div className={`${styles.weibo} ${styles.share_item}`}>
            <i className="iconfont icon-weibo"></i>
        </div>
        <div className={`${styles.zone} ${styles.share_item}`}>
            <i className="iconfont icon-qzone"></i>
        </div>
    </div>
}
export default Share