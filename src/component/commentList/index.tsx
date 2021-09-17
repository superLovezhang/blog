import React, { FC } from "react"

import styles from "./index.module.less"

interface CommentListProps {

}
const CommentList: FC<CommentListProps> = () => {
    return <div className={styles.comment_list_wrap}>
        {/*<Empty tip={'赶快写下您的第一条评论吧'}/>*/}
        <div className={styles.comment_item}>
            <div className={styles.comment_avatar}>
                <img src="https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100" alt=""/>
            </div>
            <div className={styles.comment_main}>
                <div className={styles.comment_username}>管理员</div>
                <div className={styles.comment_content}>网站做得非常不错！吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼和😁</div>
                <div className={styles.comment_operation}>
                    <div className={styles.like}>
                        <i className='iconfont icon-like-fill'></i>
                        <span>1点赞</span>
                    </div>
                    <div className={styles.reply}>
                        <i className='iconfont icon-a-share3-fill'></i>
                        <span>回复</span>
                    </div>
                </div>
            </div>
            <div className={styles.comment_date}>2021-09-17</div>
        </div>
    </div>
}

export default CommentList