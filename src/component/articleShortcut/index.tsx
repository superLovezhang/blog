import { FC }  from "react"
import { useHistory } from 'react-router-dom'

import { useCollectArticleList } from "../../query/collectionQuery"
import { useArticleHotList } from "../../query/articleQuery"
import Empty from "@/component/empty/index.tsx"
import {ArticleVO, CollectionVO} from "../../api/types"

import styles from './index.module.less'

const RECOMMENDATIONS = '豆瓣FM接口,'.repeat(10).split(',').filter(item => item !== '')
interface ArticleShortcutProps {
}
const ArticleShortcut: FC<ArticleShortcutProps> = () => {
    const history = useHistory()
    const { data: articleData } = useArticleHotList()
    const { data: collectionData } = useCollectArticleList({ page: 1, size: 5 })
    const collectionList = collectionData?.data?.records ?? []
    const articleList = articleData?.data ?? []
    return <div className={styles.article_shortcut_wrap}>
        <div className={styles.shortcut_recommendation}>
            <div className={styles.title}>
                <i className={'iconfont icon-like-fill'}/>
                <span>今日推荐</span>
            </div>
            {articleList.map((item: ArticleVO, index: number) => <div
                className={styles.item}
                key={item.articleId}
                onClick={() => history.push(`/article/${item.articleId}`)}
                title={item.articleName}
            >
                <i>{index + 1}</i>
                <span>{item.articleName}</span>
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
                title={collection.article.articleName}
            >
                <span>{collection.article.articleName}</span>
            </div>)}
            {collectionList.length === 0 && <Empty/>}
        </div>
    </div>
}

export default ArticleShortcut