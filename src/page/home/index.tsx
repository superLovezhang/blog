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

const ARTICLE_TYPE = [
    { name: '最新', column: 'createTime' },
    { name: '最热', column: 'viewCount' }
]

const Home = () => {
    const [pagination, nextPage, resetPagination] = usePagination()
    const { state: { searchValue } } = useContext(blogContext)
    const [plainTextLayout, setPlainTextLayout] = useState(false)
    const [isPagination, setIsPagination] = useState(false)
    const [articles, setArticles] = useState<any[]>([])
    const [articleQueryParams, setArticleQueryParams] = useState<ArticleQueryParams>({ })
    const { data: articleData, isError, error } = useArticleList({ ...articleQueryParams, ...pagination })
    const { sortColumn = 'createTime' } = articleQueryParams

    useEffect(() => {
        if (isPagination) {
            setArticles([...articles, ...(articleData?.data?.records ?? [])])
        } else {
            setArticles(articleData?.data?.records ?? [])
        }
    }, [articleData?.data?.records, isPagination])
    const changeQueryParams = (params: any = {}) => {
        resetPagination()
        setIsPagination(false)
        setArticleQueryParams({ ...articleQueryParams, ...params })
    }
    const navigationNextPage = () => {
        nextPage()
        setIsPagination(true)
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
                {ARTICLE_TYPE.map(type => <span
                    key={type.name}
                    className={`cursor_pointer ${(sortColumn === type.column) && 'active'}`}
                    onClick={() => changeQueryParams({ sortColumn: type.column})}
                >{type.name}</span>)}
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
                <LoadMore hasMore={!!articleData?.data?.next} loadMore={navigationNextPage}/>
            </> : <Empty/>}
        </div>
        <ArticleShortcut/>
    </div>
}

export default Home