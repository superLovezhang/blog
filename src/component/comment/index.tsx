import React, {FC, Fragment, useContext, useEffect, useState} from "react"

import EmojiPicker from '@/component/emojiPicker/index.tsx'

import { useComment } from "../../util/hook"
import { blogContext } from "../../store"
import {CommentTreeVO, CommentVO} from "../../api/types"
import { objectIsNull } from "../../util/util"
import styles from "./index.module.less"


interface CommentProps {
    comment: CommentVO | CommentTreeVO
    parentId: string
    refreshComments: () => void
}
const Comment: FC<CommentProps> = ({ comment, parentId, refreshComments }) => {
    const [commentContent, setComment, publishComment, likeComment] = useComment()
    const [collected, setCollected] = useState(false)
    const { state: { user }, dispatch } = useContext(blogContext)
    const [showReply, setShowReply] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const [likes, setLikes] = useState(comment.likes ?? 0)
    const { avatar, username } = comment?.user ?? {}
    const { username: replyUsername } = comment?.replyComment?.user ?? {}
    const replyComment = () => {
        if (objectIsNull(user)) {
            dispatch({ type: 'OPEN_LOGIN'})
            return
        }
        setShowReply(!showReply)
    }
    const publish = () => {
        publishComment(
            { articleId: comment.articleId, replyId: comment.commentId, parentId },
            () => {
                refreshComments()
                setShowReply(!showReply)
            }
        )
    }
    const clickLikeComment = () => {
        setCollected(!collected)
        setLikes(!collected ? likes + 1 : likes - 1)
        likeComment(comment.commentId)
    }
    useEffect(() => {
        setCollected(comment.selfLike)
        setLikes(comment.likes)
    }, [comment])

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
                    <div className={styles.comment_operation}>
                        <div
                            className={`${styles.like} ${collected && styles.collected}`}
                            onClick={clickLikeComment}
                        >
                            <i className='iconfont icon-like-fill'/>
                            <span>{likes} 点赞</span>
                        </div>
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
                    refreshComments={refreshComments}
                />)}
            </div>
        </div>
    </div>
}

export default Comment