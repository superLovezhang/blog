import React, { FC, Fragment } from "react"

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
                        <div className={styles.reply}>
                            <i className='iconfont icon-a-share3-fill'/>
                            <span>回复</span>
                        </div>
                    </div>
                </div>
                <div className={styles.comment_date}>{comment.createTime}</div>
            </div>
            <div className="reply_comment">

            </div>
            <div className={styles.comment_children}>
                {comment.children.map(child => <Comment comment={child}/>)}
            </div>
        </div>
    </div>
}

export default Comment