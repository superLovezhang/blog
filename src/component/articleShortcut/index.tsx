import { FC }  from "react"
import { useHistory } from 'react-router-dom'

import { useCollectArticleList } from "../../query/collectionQuery"
import Empty from "@/component/empty/index.tsx"
import { CollectionVO } from "../../api/types"

import styles from './index.module.less'

const RECOMMENDATIONS = '豆瓣FM接口,'.repeat(10).split(',').filter(item => item !== '')
interface ArticleShortcutProps {
}
const ArticleShortcut: FC<ArticleShortcutProps> = () => {
    const history = useHistory()
    const { data: collectionData } = useCollectArticleList({ page: 1, size: 5 })
    const collectionList = collectionData?.data?.records ?? []
    return <div className={styles.article_shortcut_wrap}>
        <div className={styles.shortcut_recommendation}>
            <div className={styles.title}>
                <i className={'iconfont icon-like-fill'}/>
                <span>今日推荐</span>
            </div>
            {RECOMMENDATIONS.map((item, index) => <div className={styles.item} key={index}>
                <i>{index + 1}</i>
                <span>{item}</span>
            </div>)}
        </div>
        <div className={styles.shortcut_collection}>
            <div className={styles.title}>
                <i className={'iconfont icon-collection-fill'}/>
                <span>我的最新收藏</span>
            </div>
            {collectionList.map((collection: CollectionVO) => <div
                className={styles.item} key={collection.article.articleId}
                onClick={() => history.push(`/article/${collection.article.articleId}`)}
            >
                <span>{collection.article.articleName}</span>
            </div>)}
            {collectionList.length === 0 && <Empty/>}
        </div>
    </div>
}

export default ArticleShortcut