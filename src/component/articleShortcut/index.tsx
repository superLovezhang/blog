import { FC}  from "react"
import styles from './index.module.less'

interface ArticleShortcutProps {

}
const ArticleShortcut: FC<ArticleShortcutProps> = () => {
    return <div className={styles.article_shortcut_wrap}>
        <div className={styles.shortcut_recommendation}>
            <div className={styles.title}>
                <i className={'iconfont icon-like-fill'}></i>
                <span>今日推荐</span>
            </div>

        </div>
        <div className={styles.shortcut_collection}>
            <div className={styles.title}>
                <i className={'iconfont icon-collection-fill'}></i>
                <span>我的最新收藏</span>
            </div>
        </div>
    </div>
}

export default ArticleShortcut