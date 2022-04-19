import { useContext, useEffect, useState } from "react"

import Category from "@/component/category/index.tsx"
import ArticleShortcut from "@/component/articleShortcut/index.tsx"

import { useArticleList } from "../../query/articleQuery"
import { ArticleQueryParams, ArticleVO } from "../../api/types"
import { blogContext } from "../../store"

import {usePagination} from "../../util/hook"
import LoadMore from "../../component/loadMore"
import Empty from "../../component/empty"
import ArticleItem from "../../component/articleItem"
import styles from './index.module.less'

const Home = () => {
    const [pagination, nextPage, resetPagination] = usePagination(10, false)
    const { state: { searchValue } } = useContext(blogContext)
    const [plainTextLayout, setPlainTextLayout] = useState(false)
    const [articles, setArticles] = useState<any[]>([])
    const [articleQueryParams, setArticleQueryParams] = useState<ArticleQueryParams>({ })
    const { data: articleData, isError, error } = useArticleList({ ...articleQueryParams, ...pagination })
    const { sortColumn } = articleQueryParams

    useEffect(() => {
        setArticles([...articles, ...(articleData?.data?.records ?? [])])
    }, [articleData?.data?.records])

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
                    {articles.map((article: ArticleVO) => <ArticleItem
                        article={article}
                        key={article.articleId}
                        plainTextLayout={plainTextLayout}
                    />)}
                </div>
                <LoadMore hasMore={!!articleData?.data?.next} loadMore={nextPage}/>
            </> : <Empty/>}
        </div>
        <ArticleShortcut/>
    </div>
}

export default Home