import { FC }  from "react"
import { useHistory } from 'react-router-dom'

import {useRecentCollectArticles} from "../../query/collectionQuery"
import { useArticleHotList } from "../../query/articleQuery"
import Empty from "@/component/empty/index.tsx"
import {ArticleRecordVO, ArticleVO} from "../../api/types"

import styles from './index.module.less'

interface ArticleShortcutProps {
}
const ArticleShortcut: FC<ArticleShortcutProps> = () => {
    const history = useHistory()
    const { data: articleData } = useArticleHotList()
    const { data: collectionArticleData } = useRecentCollectArticles()
    const collectionArticleList = collectionArticleData?.data ?? []
    const articleList = articleData?.data ?? []
    return <div className={styles.article_shortcut_wrap}>
        <div className={styles.shortcut_recommendation}>
            <div className={styles.title}>
                <i className={'iconfont icon-like-fill'}/>
                <span>今日推荐</span>
            </div>
            {articleList.map((item: ArticleRecordVO, index: number) => <div
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
            {collectionArticleList.map((article: ArticleRecordVO) => <div
                className={styles.item} key={article.articleId}
                onClick={() => history.push(`/article/${article.articleId}`)}
                title={article.articleName}
            >
                <span>{article.articleName}</span>
            </div>)}
            {collectionArticleList.length === 0 && <Empty/>}
        </div>
    </div>
}

export default ArticleShortcut