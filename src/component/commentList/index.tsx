import React, { FC } from "react"

import Comment from '@/component/comment/index.tsx'
import Empty from "@/component/empty/index.tsx"
import LoadMore from "../loadMore"

import { useCommentList } from "../../query/commentQuery"
import { usePagination } from "../../util/hook"
import { CommentTreeVO } from "../../api/types"
import styles from "./index.module.less"

interface CommentListProps {
    articleId?: string
}
const CommentList: FC<CommentListProps> = ({ articleId }) => {
    const [pagination, nextPagination] = usePagination()
    const { data } = useCommentList({ articleId, ...pagination })
    const commentList: CommentTreeVO[] | [] = data?.data?.records ?? []

    if (commentList.length === 0) {
        return <Empty tip={'赶快写下您的第一条评论吧'}/>
    }

    return <div className={styles.comment_list_wrap}>
        <div className={styles.comment_container}>
            {commentList.map(comment => <Comment
                comment={comment}
                parentId={comment.commentId}
                key={comment.commentId}
            />)}
        </div>
        <LoadMore hasMore={!!data?.data?.next} loadMore={nextPagination}/>
    </div>
}

export default CommentList