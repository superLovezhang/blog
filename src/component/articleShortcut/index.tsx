import { FC }  from "react"

import Empty from "@/component/empty/index.tsx"
import styles from './index.module.less'

const RECOMMENDATIONS = '豆瓣FM接口,'.repeat(10).split(',').filter(item => item !== '')
interface ArticleShortcutProps {
}
const ArticleShortcut: FC<ArticleShortcutProps> = () => {
    return <div className={styles.article_shortcut_wrap}>
        <div className={styles.shortcut_recommendation}>
            <div className={styles.title}>
                <i className={'iconfont icon-like-fill'}></i>
                <span>今日推荐</span>
            </div>
            {RECOMMENDATIONS.map((item, index) => <div className={styles.item}>
                <i>{index + 1}</i>
                <span>{item}</span>
            </div>)}
        </div>
        <div className={styles.shortcut_collection}>
            <div className={styles.title}>
                <i className={'iconfont icon-collection-fill'}></i>
                <span>我的最新收藏</span>
            </div>
            <Empty/>
        </div>
    </div>
}

export default ArticleShortcut