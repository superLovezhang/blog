import React, { FC, useEffect, useState } from "react"

import Comment from '@/component/comment/index.tsx'
import Empty from "@/component/empty/index.tsx"

import { list } from '../../api/comment'
import { usePagination } from "../../util/hook"
import { CommentTreeVO } from "../../api/types"
import styles from "./index.module.less"

interface CommentListProps {
    articleId?: string
}
const CommentList: FC<CommentListProps> = ({ articleId }) => {
    const [commentList, setCommentList] = useState<CommentTreeVO[]>([])
    const [pagination, nextPagination] = usePagination()

    useEffect(() => {
        if (articleId) {
            list({ ...pagination, articleId })
                .then(res => {
                    setCommentList(res?.data?.records ?? [])
                })
                .catch(err => alert(err))
        }
    }, [pagination, articleId])

    if (commentList.length === 0) {
        return <Empty tip={'赶快写下您的第一条评论吧'}/>
    }

    return <div className={styles.comment_list_wrap}>
        {commentList.map(comment => <Comment comment={comment} parentId={comment.commentId}/>)}
    </div>
}

export default CommentList