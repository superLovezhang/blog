import React, { FC, Fragment, useState } from "react"

import EmojiPicker from '@/component/emojiPicker/index.tsx'
import styles from "./index.module.less"

export interface CommentType {
    avatar: string
    username: string
    content: string
    like: number
    createTime: string
    replyName?: string
    children: CommentType[]
}
interface CommentProps {
    comment: CommentType
}
const Comment: FC<CommentProps> = ({ comment }) => {
    const [showReply, setShowReply] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const [commentContent, setCommentContent] = useState('')

    return <div className={styles.comment_item}>
        <div className={styles.comment_avatar}>
            <img src={comment.avatar} alt=""/>
        </div>
        <div className={styles.comment_right}>
            <div className={styles.main_comment}>
                <div className={styles.comment_main}>
                    <div className={styles.comment_username}>
                        {comment.username}
                        {comment.replyName && <Fragment><span>回复</span>superLovezhang</Fragment>}
                    </div>
                    <div className={styles.comment_content}>{comment.content}</div>
                    <div className={styles.comment_operation}>
                        <div className={styles.like}>
                            <i className='iconfont icon-like-fill'/>
                            <span>{comment.like} 点赞</span>
                        </div>
                        <div className={styles.reply} onClick={() => setShowReply(!showReply)}>
                            <i className='iconfont icon-a-share3-fill'/>
                            <span>{showReply ? '取消回复' : '回复'}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.comment_date}>{comment.createTime}</div>
            </div>
            {showReply && <div className={styles.reply_comment}>
                <div className={styles.reply_input}>
                    <input
                        type="text"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <button onClick={() => setShowEmoji(!showEmoji)}>
                        <i className='iconfont icon-emotion-fill'/>
                    </button>
                    <div className={styles.comment_emoji}>
                        <EmojiPicker visible={showEmoji} callback={(data: any) => setCommentContent(commentContent + data.emoji)}/>
                    </div>
                </div>
                <div className={styles.post_comment}>发布</div>
            </div>}
            <div className={styles.comment_children}>
                {comment.children.map(child => <Comment comment={child}/>)}
            </div>
        </div>
    </div>
}

export default Comment