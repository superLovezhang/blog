import React, { FC } from "react"

import Comment from '@/component/comment/index.tsx'
import Empty from "@/component/empty/index.tsx"
import { CommentType } from "../comment"
import styles from "./index.module.less"

interface CommentListProps {
    commentList: CommentType[]
}
const CommentList: FC<CommentListProps> = ({ commentList }) => {
    if (commentList.length === 0) {
        return <Empty tip={'赶快写下您的第一条评论吧'}/>
    }

    return <div className={styles.comment_list_wrap}>
        {commentList.map(comment => <Comment comment={comment}/>)}
    </div>
}

export default CommentList