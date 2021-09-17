import React, { FC } from "react"

import Empty from "@/component/empty/index.tsx"

import styles from "./index.module.less"

const commentList = [
    {
        avatar: 'https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100',
        username: '管理员',
        content: '网站做得非常不错！吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼和😁',
        like: 1,
        createTime: '2021-09-17',
        children: [
            {
                avatar: 'https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100',
                username: '网站管理者',
                content: '谢谢！我会继续努力的😁',
                like: 3,
                createTime: '2021-09-18',
            }
        ]
    },
    {
        avatar: 'https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100',
        username: '管理员',
        content: '我有一个建议，就是网页写的简单一点',
        like: 12,
        createTime: '2021-09-18'
    }
]
interface CommentListProps {

}
const CommentList: FC<CommentListProps> = () => {
    return <div className={styles.comment_list_wrap}>
        {commentList.length > 0 ? commentList.map(comment => <div className={styles.comment_item}>
            <div className={styles.comment_avatar}>
                <img src={comment.avatar} alt=""/>
            </div>
            <div className={styles.comment_main}>
                <div className={styles.comment_username}>{comment.username}</div>
                <div className={styles.comment_content}>{comment.content}</div>
                <div className={styles.comment_operation}>
                    <div className={styles.like}>
                        <i className='iconfont icon-like-fill'></i>
                        <span>{comment.like} 点赞</span>
                    </div>
                    <div className={styles.reply}>
                        <i className='iconfont icon-a-share3-fill'></i>
                        <span>回复</span>
                    </div>
                </div>
            </div>
            <div className={styles.comment_date}>{comment.createTime}</div>
        </div>) : <Empty tip={'赶快写下您的第一条评论吧'}/>}

    </div>
}

export default CommentList