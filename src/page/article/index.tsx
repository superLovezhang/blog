import React, { FC } from "react"
import { useParams } from 'react-router-dom'
import moment from "moment"
import 'react-markdown-editor-lite/lib/index.css'



import ArticleShortcut from "@/component/articleShortcut/index.tsx"
import Share from "./share/index.tsx"
import PublishComment from "@/component/publishComment/index.tsx"
import Loading from "@/component/loading/index.tsx"
import CommentList from "../../component/commentList"
import MarkdownNavbar from "../../component/markdonwNavbar"

import { useArticleDetail } from "../../query/articleQuery"
import { ArticleVO } from "../../api/types"
import styles from './index.module.less'

interface ArticleProps {}
const Article: FC<ArticleProps> = () => {
    const { id } = useParams<{ id: string}>()
    const { data, isLoading } = useArticleDetail(id)
    const article = data?.data as Partial<ArticleVO>

    return <div className={styles.article_detail_wrap}>
        <MarkdownNavbar source={article?.content ?? ''}/>
        <Share article={article}/>
        <div className={styles.article_detail}>
            {!isLoading ? <>
                <div className={styles.article_info}>
                    <div className={styles.article_title}>{article.articleName}</div>
                    <div className={styles.article_info_bottom}>
                        <div className={styles.article_data}>
                            <div className={styles.author}>
                                <img src={article?.user?.avatar} alt=""/>
                                <span>{article?.user?.username}</span>
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
                <div className={styles.article_content + ' custom-html-style'}>
                    <div className={styles.article_text_box} dangerouslySetInnerHTML={{__html: article?.htmlContent ?? ''}}/>
                    <div className={styles.article_index}>
                        <div className={styles.article_category}>
                            <span>文章分类</span>
                            <div className={styles.category_item}>
                                <i className={`iconfont ${article.category?.iconClass}`}/>{article.category?.categoryName}
                            </div>
                        </div>
                        <div className={styles.article_label}>
                            <span>文章标签</span>
                            {article.labels?.map(label => <div className={styles.label_item} key={label.labelId}>{label.labelName}</div>)}
                        </div>
                    </div>
                    {!!article?.linkAddress && <div className={styles.article_reprint}>
                        原文 <a target='_blank' href={article?.linkAddress}>{article?.linkAddress}</a>
                    </div>}
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