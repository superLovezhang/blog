import React, { FC } from "react"

import Comment from '@/component/comment/index.tsx'
import { CommentType } from "../comment"
import styles from "./index.module.less"

interface CommentListProps {
    commentList: CommentType[]
}
const CommentList: FC<CommentListProps> = ({ commentList }) => {
    return <div className={styles.comment_list_wrap}>
        {commentList.map(comment => <Comment comment={comment}/>)}
    </div>
}

export default CommentList