import React from "react"

import ArticleShortcut from "@/component/articleShortcut/index.tsx"
import PublishComment from "@/component/publishComment/index.tsx"
import CommentList from "@/component/commentList/index.tsx"
import styles from './index.module.less'

const MessageBoard = () => {
    return <div className={styles.message_board_wrap}>
        <div className={styles.message_board_left}>
            <div className={styles.message_description}>
                分享您此刻的想法<br/>
                也可以分享好玩的段子
            </div>
            <div className={styles.message_publish}>
                <PublishComment/>
            </div>
            <div className={styles.message_comment}>
                <CommentList/>
            </div>
        </div>
        <ArticleShortcut/>
    </div>
}

export default MessageBoard