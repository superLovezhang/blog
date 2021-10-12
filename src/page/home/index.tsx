import {useEffect, useState} from "react"
import { useHistory } from 'react-router-dom'

import Category from "@/component/category/index.tsx"
import ArticleShortcut from "@/component/articleShortcut/index.tsx"

import { articleList } from '../../api/article'
import { className } from '@/util/util.ts'
import { ArticlePage, ArticleVO } from "../../api/types"

import styles from './index.module.less'

const Home = () => {
    const [articles, setArticles] = useState([])
    const [queryParams, setQueryParams] = useState<ArticlePage | undefined>()
    const history = useHistory()
    const [plainTextLayout, setPlainTextLayout] = useState(false)
    const articleItemClassName = className({
        [styles.article_summary]: true,
        [styles.article_card]: !plainTextLayout,
        [styles.article_text]: plainTextLayout
    })

    useEffect(() => {
        articleList(queryParams)
            .then(({ data: { records } }) => {
                setArticles(records ?? [])
            })
    }, [queryParams])

    return <div className={styles.home_wrap}>
        <Category changeQueryParams={(params: Partial<ArticlePage>) => setQueryParams({ ...queryParams, ...params })}/>
        <div className={styles.article_box}>
            <div className={styles.sort_top}>
                <span className={'cursor_pointer active'}>最新</span>
                <span className={'cursor_pointer'}>最热</span>
                <div className={styles.layout_change} onClick={() => setPlainTextLayout(!plainTextLayout)}>
                    {!plainTextLayout ?
                        <i className={'iconfont icon-7xinxifabu cursor_pointer'}/> :
                        <i className={'iconfont icon-ic_format_align_justify_px cursor_pointer'}/>}
                </div>
            </div>
            <div className={styles.article_list}>
                {articles.map((article: ArticleVO) => <div
                    className={styles.article_item}
                    key={article.articleId}
                    onClick={() => history.push(`/article/${article.articleId}`)}
                >
                    <h3 className={styles.article_title}>{article.articleName}</h3>
                    <div className={articleItemClassName}>
                        {article.cover && <div className={styles.summary_img}>
                            <img src={article.cover} alt={article.articleName}/>
                        </div>}
                        <div className={styles.summary_text}>
                            <span>{article.previewContent}</span>
                        </div>
                    </div>
                    <div className={styles.article_info}>
                        <div className={styles.info_item}>
                            <i className="iconfont icon-like-fill"></i>
                            <span>{article.like} 点赞</span>
                        </div>
                        <div className={styles.info_item}>
                            <i className="iconfont icon-comment_fill_light"></i>
                            <span>{article.like} 条留言</span>
                        </div>
                        <div className={styles.info_item}>
                            <i className="iconfont icon-yueduliang"></i>
                            <span>{article.viewCount} 人阅读</span>
                        </div>
                        <div className={styles.info_item}>
                            <span>{article.createTime}</span>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
        <ArticleShortcut/>
    </div>
}

export default Home