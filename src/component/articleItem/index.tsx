import { FC } from "react"
import { useHistory } from 'react-router-dom'
import moment from "moment"
import { ArticleVO } from "../../api/types"
import styles from "./index.module.less"

interface ArticleItemProps {
   article: ArticleVO
}
const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
    const history = useHistory()

    return <div
        className={styles.article_item}
        key={article.articleId}
        onClick={() => history.push(`/article/${article.articleId}`)}
    >
        <h3 className={styles.article_title}>{article.articleName}</h3>
        <div className={`${styles.article_summary} ${styles.article_card}`}>
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
    </div>
}

export default ArticleItem