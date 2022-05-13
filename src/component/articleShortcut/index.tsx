import { FC, useMemo } from "react"
import { useHistory } from 'react-router-dom'

import Empty from "@/component/empty/index.tsx"

import { useRecentCollectArticles } from "../../query/collectionQuery"
import { useArticleHotList } from "../../query/articleQuery"
import { ArticleRecordVO } from "../../api/types"
import styles from './index.module.less'

type SHORT_CUT_TYPE = 'RECOMMEND' | 'COLLECT'
const SHORT_CUT_MAP = {
    RECOMMEND: { title: '今日推荐', icon: 'iconfont icon-like-fill' },
    COLLECT: { title: '我的最新收藏', icon: 'iconfont icon-collection-fill' },
}
interface ArticleShortcutProps {
}
const ArticleShortcut: FC<ArticleShortcutProps> = () => {
    const { data: articleData } = useArticleHotList()
    const { data: collectionArticleData } = useRecentCollectArticles()
    const collectionArticleList = collectionArticleData?.data ?? []
    const articleList = articleData?.data ?? []

    const ItemList = useMemo(() => [
        {
            type: "RECOMMEND" as SHORT_CUT_TYPE,
            showRank: true,
            articleList: articleList,
        },
        {
            type: "COLLECT" as SHORT_CUT_TYPE,
            showRank: false,
            articleList: collectionArticleList,
        }
    ], [articleData, collectionArticleData])

    return <div className={styles.article_shortcut_wrap}>
        {ItemList.map((item, index) => <ShortCutItem key={index} {...item}/>)}
    </div>
}


interface ShortCutItemProps {
    type: SHORT_CUT_TYPE
    showRank?: boolean
    articleList: ArticleRecordVO[]
}
const ShortCutItem: FC<ShortCutItemProps> = ({ type, showRank, articleList }) => {
    const shortcut = SHORT_CUT_MAP[type]
    const history = useHistory()

    const go = (url: string) => {
        history.push(url)
    }

    return <div className={styles.shortcut_item}>
        <div className={styles.title}>
            <i className={shortcut.icon}/>
            <span>{shortcut.title}</span>
        </div>
        {articleList.map((item: ArticleRecordVO, index: number) => <div
            className={styles.item}
            key={item.articleId}
            onClick={() => go(`/article/${item.articleId}`)}
            title={item.articleName}
        >
            {showRank && <i>{index + 1}</i>}
            <span>{item.articleName}</span>
        </div>)}
        {articleList.length === 0 && <Empty/>}
    </div>
}
export default ArticleShortcut