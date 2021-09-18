import React from "react"

import CommentList from "@/component/commentList/index.tsx"
import Empty from "@/component/empty/index.tsx"

const commentList = [
    {
        avatar: 'https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100',
        username: '管理员',
        content: '网站做得非常不错！吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼和😁',
        like: 1,
        createTime: '2021-09-17',
        children: [
            {
                replyName: '管理员',
                avatar: 'https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100',
                username: '网站管理者',
                content: '谢谢！我会继续努力的😁',
                like: 3,
                createTime: '2021-09-18',
                children: []
            }
        ]
    },
    {
        avatar: 'https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100',
        username: '管理员',
        content: '我有一个建议，就是网页写的简单一点',
        like: 12,
        createTime: '2021-09-18',
        children: []
    }
]
const ArticleComment = () => {
    if (commentList.length === 0) {
        return <Empty tip={'赶快写下您的第一条评论吧'}/>
    }
    return <CommentList commentList={commentList}/>
}

export default ArticleComment