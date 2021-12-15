import React, {FC, Fragment, useContext, useEffect, useState} from "react"

import EmojiPicker from '@/component/emojiPicker/index.tsx'
import ImageView from "../imageView"

import { useComment, useLikeComment, useRemoveComment } from "../../query/commentQuery"
import { useUserInfo } from "../../query/userQuery"
import { blogContext } from "../../store"
import { CommentTreeVO, CommentVO } from "../../api/types"
import styles from "./index.module.less"


interface CommentProps {
    comment: CommentVO | CommentTreeVO
    parentId: string
}
const Comment: FC<CommentProps> = ({ comment, parentId }) => {
    const { data: userData } = useUserInfo()
    const { mutateAsync: commentMutate, isError: isCommentError, error: commentError } = useComment()
    const { mutateAsync: likeMutate, isError: isLikeError, error: likeError } = useLikeComment()
    const { mutate: removeCommentApi } = useRemoveComment()
    const [commentContent, setComment] = useState('')
    const { dispatch } = useContext(blogContext)
    const [showReply, setShowReply] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const { avatar, username } = comment?.user ?? {}
    const { username: replyUsername } = comment?.replyComment?.user ?? {}
    const user = userData?.data
    const isMyComment = user?.userId === comment?.user.userId

    const replyComment = () => {
        if (user === null) {
            dispatch({ type: 'OPEN_LOGIN'})
            return
        }
        setShowReply(!showReply)
    }
    const publish = async () => {
        await commentMutate({ articleId: comment.articleId, replyId: comment.commentId, parentId, content: commentContent })
        setShowReply(!showReply)
    }
    const clickLikeComment = async () => {
        await likeMutate(comment.commentId)
    }
    const removeComment = () => {
        if (window.confirm('确定删除这条评论吗')) {
            removeCommentApi(comment.commentId)
        }
    }
    useEffect(() => {
        if (isCommentError) {
            alert(commentError)
        }
    }, [isCommentError, commentError])
    useEffect(() => {
        if (isLikeError) {
            alert(likeError)
        }
    }, [isLikeError, likeError])

    return <div className={styles.comment_item}>
        <div className={styles.comment_avatar}>
            <img src={avatar} alt=""/>
        </div>
        <div className={styles.comment_right}>
            <div className={styles.main_comment}>
                <div className={styles.comment_main}>
                    <div className={styles.comment_username}>
                        {username}
                        {replyUsername && <Fragment><span>回复</span>{replyUsername}</Fragment>}
                    </div>
                    <div className={styles.comment_content}>{comment.content}</div>
                    {!!comment.pics && <div className={styles.comment_img}>
                        <ImageView images={comment.pics}/>
                    </div>}
                    <div className={styles.comment_operation}>
                        <div
                            className={`${styles.like} ${comment.selfLike && styles.collected}`}
                            onClick={clickLikeComment}
                        >
                            <i className='iconfont icon-like-fill'/>
                            <span>{comment.likes} 点赞</span>
                        </div>
                        {isMyComment && <div
                            className={`${styles.like}`}
                            onClick={removeComment}
                        >
                            <i className='iconfont icon-rubbish-icon'/>
                            <span>删除</span>
                        </div>}
                        <div className={styles.reply} onClick={() => replyComment()}>
                            <i className='iconfont icon-a-share3-fill'/>
                            <span>{showReply ? '取消回复' : '回复'}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.comment_date}>{comment.createTime.split(" ")[0]}</div>
            </div>
            {showReply && <div className={styles.reply_comment}>
                <div className={styles.reply_input}>
                    <input
                        type="text"
                        autoFocus
                        placeholder={`回复 ${comment.user.username}`}
                        value={commentContent}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button onClick={() => setShowEmoji(!showEmoji)}>
                        <i className='iconfont icon-emotion-fill'/>
                    </button>
                    <div className={styles.comment_emoji}>
                        <EmojiPicker visible={showEmoji} callback={(data: any) => setComment(commentContent + data.emoji)}/>
                    </div>
                </div>
                <div
                    className={styles.post_comment}
                    onClick={publish}
                >发布</div>
            </div>}
            <div className={styles.comment_children}>
                {"children" in comment && comment?.children.map(child => <Comment
                    comment={child}
                    parentId={parentId}
                    key={child.commentId}
                />)}
            </div>
        </div>
    </div>
}

export default Comment