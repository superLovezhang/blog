import React, {FC, useEffect, useState} from "react"
import { useParams } from 'react-router-dom'
import moment from "moment"

import ArticleShortcut from "@/component/articleShortcut/index.tsx"
import Share from "@/component/share/index.tsx"
import PublishComment from "@/component/publishComment/index.tsx"
import Loading from "@/component/loading/index.tsx"
import ArticleComment from "./articleComment/index.tsx"

import { detail } from '../../api/article'
import { ArticleVO } from '../../api/types'

import styles from './index.module.less'

interface ArticleProps {}
const Article: FC<ArticleProps> = () => {
    const params = useParams<{ id: string}>()
    const [article, setArticle] = useState<ArticleVO>()
    useEffect(() => {
        if (params.id) {
            detail(parseInt(params.id))
                .then(({ data }) => {
                    setArticle(data)
                })
        }
    // eslint-disable-next-line
    }, [])


    return <div className={styles.article_detail_wrap}>
        <Share/>
        <div className={styles.article_detail}>
            {article ? <>
                <div className={styles.article_info}>
                    <div className={styles.article_title}>{article.articleName}</div>
                    <div className={styles.article_info_bottom}>
                        <div className={styles.article_data}>
                            <div className={styles.author}>
                                <img src="https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/60497771cc5eb351949ed4d8-1630921219218.jpg?x-oss-process=image/resize,limit_0,m_fill,w_30,h_30/quality,q_100" alt=""/>
                                <span>管理员</span>
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
                <div className={styles.article_content} dangerouslySetInnerHTML={{ __html: article.content }}>
                </div>
            </> : <Loading/>}
            <div className={styles.article_publish_comment}>
                <PublishComment/>
            </div>
            <div className={styles.article_comments}>
                <ArticleComment/>
            </div>
        </div>
        <ArticleShortcut/>
    </div>
}

export default Article