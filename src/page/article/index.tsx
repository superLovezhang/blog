import React, { FC } from "react"

import ArticleShortcut from "@/component/articleShortcut/index.tsx"
import Share from "@/component/share/index.tsx"

import styles from './index.module.less'

interface ArticleProps {

}
const Article: FC<ArticleProps> = () => {
    return <div className={styles.article_detail_wrap}>
        <Share/>
        <div className={styles.article_detail}>
            article
        </div>
        <ArticleShortcut/>
    </div>
}

export default Article