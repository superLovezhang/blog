import {useEffect, useState} from "react"
import { useHistory } from 'react-router-dom'
import moment from "moment"

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

    const changeQueryParams = (params: Partial<ArticlePage>) => {
        console.log({ ...queryParams, ...params })
        setQueryParams({ ...queryParams, ...params })
    }
    useEffect(() => {
        articleList(queryParams)
            .then(({ data: { records } }) => {
                setArticles(records ?? [])
            })
    }, [queryParams])

    return <div className={styles.home_wrap}>
        <Category changeQueryParams={changeQueryParams}/>
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
                            <i className="iconfont icon-like-fill"/>
                            <span>{article.likes} 点赞</span>
                        </div>
                        <div className={styles.info_item}>
                            <i className="iconfont icon-comment_fill_light"/>
                            <span>{article.commentCount} 条留言</span>
                        </div>
                        <div className={styles.info_item}>
                            <i className="iconfont icon-yueduliang"/>
                            <span>{article.viewCount} 人阅读</span>
                        </div>
                        <div className={styles.info_item}>
                            <span>{moment(article.createTime).fromNow()}</span>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
        <ArticleShortcut/>
    </div>
}

export default Home