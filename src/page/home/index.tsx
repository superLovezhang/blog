import { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import moment from "moment"

import Category from "@/component/category/index.tsx"
import ArticleShortcut from "@/component/articleShortcut/index.tsx"

import { useArticleList } from "../../query/articleQuery"
import { className } from '@/util/util.ts'
import { ArticleQueryParams, ArticleVO } from "../../api/types"
import { blogContext } from "../../store"

import styles from './index.module.less'
import {usePagination} from "../../util/hook";
import LoadMore from "../../component/loadMore";
import Empty from "../../component/empty";

const Home = () => {
    const history = useHistory()
    const [pagination, nextPage, resetPagination] = usePagination()
    const { state: { searchValue } } = useContext(blogContext)
    const [plainTextLayout, setPlainTextLayout] = useState(false)
    const [articleQueryParams, setArticleQueryParams] = useState<ArticleQueryParams>({ })
    const { data: articleData, isError, error } = useArticleList({ ...articleQueryParams, ...pagination })
    const { sortColumn } = articleQueryParams
    const articleItemClassName = (hasCover: boolean) => className({
        [styles.article_summary]: true,
        [styles.article_card]: hasCover && !plainTextLayout,
        [styles.article_text]: !hasCover || plainTextLayout
    })
    const articles = articleData?.data?.records ?? []

    const changeArticleSort = () => {
        setArticleQueryParams({
            ...articleQueryParams,
            sortColumn: sortColumn === 'viewCount' ? 'createTime' : 'viewCount'
        })
    }
    const changeQueryParams = (params: any = {}) => {
        resetPagination()
        setArticleQueryParams({ ...articleQueryParams, ...params })
    }
    //@ts-ignore
    useEffect(() => isError && alert(error), [isError, error])
    useEffect(() => setArticleQueryParams({ searchValue }), [searchValue])

    return <div className={styles.home_wrap}>
        <Category
            queryParams={articleQueryParams}
            changeQueryParams={changeQueryParams}
        />
        <div className={styles.article_box}>
            <div className={styles.sort_top}>
                <span
                    className={`cursor_pointer ${(sortColumn === 'createTime' || !sortColumn) && 'active'}`}
                    onClick={changeArticleSort}
                >最新</span>
                <span
                    className={`cursor_pointer ${sortColumn === 'viewCount' && 'active'}`}
                    onClick={changeArticleSort}
                >最热</span>
                <div className={styles.layout_change} onClick={() => setPlainTextLayout(!plainTextLayout)}>
                    {!plainTextLayout ?
                        <i className={'iconfont icon-7xinxifabu cursor_pointer'}/> :
                        <i className={'iconfont icon-ic_format_align_justify_px cursor_pointer'}/>}
                </div>
            </div>

            {articles.length !== 0 ? <>
                <div className={styles.article_list}>
                    {articles.map((article: ArticleVO) => <div
                        className={styles.article_item}
                        key={article.articleId}
                        onClick={() => history.push(`/article/${article.articleId}`)}
                    >
                        <h3 className={styles.article_title}>{article.articleName}</h3>
                        <div className={articleItemClassName(!!article.cover)}>
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
                <LoadMore hasMore={!!articleData?.data?.next} loadMore={nextPage}/>
            </> : <Empty/>}
        </div>
        <ArticleShortcut/>
    </div>
}

export default Home