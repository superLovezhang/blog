import React, { FC } from "react"
import { useParams } from 'react-router-dom'
import moment from "moment"
import 'react-markdown-editor-lite/lib/index.css'


import ArticleShortcut from "@/component/articleShortcut/index.tsx"
import Share from "./share/index.tsx"
import PublishComment from "@/component/publishComment/index.tsx"
import Loading from "@/component/loading/index.tsx"
import CommentList from "../../component/commentList"

import { useArticleDetail } from "../../query/articleQuery"
import styles from './index.module.less'

interface ArticleProps {}
const Article: FC<ArticleProps> = () => {
    const { id } = useParams<{ id: string}>()
    const { data, isLoading } = useArticleDetail(id)
    const article = data?.data

    return <div className={styles.article_detail_wrap}>
        <Share articleId={id} collected={article?.collected}/>
        <div className={styles.article_detail}>
            {!isLoading ? <>
                <div className={styles.article_info}>
                    <div className={styles.article_title}>{article.articleName}</div>
                    <div className={styles.article_info_bottom}>
                        <div className={styles.article_data}>
                            <div className={styles.author}>
                                <img src={article.user.avatar} alt=""/>
                                <span>{article.user.username}</span>
                            </div>
                            <div className={styles.detail_info}>
                                <div className={styles.info_item}>{article.viewCount}阅读</div>
                                <div className={styles.info_item}>{article.commentCount}评论</div>
                                <div className={styles.info_item}>{article.likes}喜欢</div>
                            </div>
                        </div>
                        <div className={styles.publish_time}>发布于:{moment(article.createTime).fromNow()}</div>
                    </div>
                </div>
                <div className={styles.article_content + ' custom-html-style'} dangerouslySetInnerHTML={{ __html: article.htmlContent }}>
                </div>
            </> : <div className={styles.loading_wrap}><Loading/></div>}
            <div className={styles.article_publish_comment}>
                <PublishComment articleId={id}/>
            </div>
            <div className={styles.article_comments}>
                <CommentList articleId={id}/>
            </div>
        </div>
        <ArticleShortcut/>
    </div>
}

export default Article