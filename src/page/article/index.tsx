import React, { FC } from "react"

import ArticleShortcut from "@/component/articleShortcut/index.tsx"
import Empty from "@/component/empty/index.tsx"
import Share from "@/component/share/index.tsx"
import Comment from "@/component/comment/index.tsx"

import styles from './index.module.less'

interface ArticleProps {}
const Article: FC<ArticleProps> = () => {
    return <div className={styles.article_detail_wrap}>
        <Share/>
        <div className={styles.article_detail}>
            <div className={styles.article_info}>
                <div className={styles.article_title}>项目常用：axios拦截器之重复请求取消</div>
                <div className={styles.article_info_bottom}>
                    <div className={styles.article_data}>
                        <div className={styles.author}>
                            <img src="https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/60497771cc5eb351949ed4d8-1630921219218.jpg?x-oss-process=image/resize,limit_0,m_fill,w_30,h_30/quality,q_100" alt=""/>
                            <span>管理员</span>
                        </div>
                        <div className={styles.detail_info}>
                            <div className={styles.info_item}>21阅读</div>
                            <div className={styles.info_item}>0评论</div>
                            <div className={styles.info_item}>0喜欢</div>
                        </div>
                    </div>
                    <div className={styles.publish_time}>发布于:4小时前</div>
                </div>
            </div>
            <div className={styles.article_content}>
                苹果官方宣布：秋季发布会定于美西时间 9 月 14 日，北京时间 2021 年 9 月 15 日凌晨 1 点。
                <br/><br/>
                目前大概率 iPhone 新系列会命名为 iPhone 13 / Pro / Pro Max，值得一提的是，苹果秋季发布会至少包括三场，首场预计是 iPhone 专场，月底可能还有一场 AirPods 相关的发布会，也有可能会直接上架官网，10 月可能是新款 iPad 系列，11 月则是新款 MacBook Pro 2021 等系列。
                <br/><br/>
                根据历年惯例，新一代的 iOS 15 /iPadOS 15 正式版和 WatchOS 8 正式版也将降临。
                <br/><br/>
                下图为 2021 年苹果秋季发布会邀请函中国版 " 真身 "。
                <br/><br/>
                IT 之家会继续追踪报道更新消息，迎接科技节 " 春晚 " 的到来。
                苹果官方宣布：秋季发布会定于美西时间 9 月 14 日，北京时间 2021 年 9 月 15 日凌晨 1 点。
                <br/><br/>
                目前大概率 iPhone 新系列会命名为 iPhone 13 / Pro / Pro Max，值得一提的是，苹果秋季发布会至少包括三场，首场预计是 iPhone 专场，月底可能还有一场 AirPods 相关的发布会，也有可能会直接上架官网，10 月可能是新款 iPad 系列，11 月则是新款 MacBook Pro 2021 等系列。
                <br/><br/>
                根据历年惯例，新一代的 iOS 15 /iPadOS 15 正式版和 WatchOS 8 正式版也将降临。
                <br/><br/>
                下图为 2021 年苹果秋季发布会邀请函中国版 " 真身 "。
                <br/><br/>
                IT 之家会继续追踪报道更新消息，迎接科技节 " 春晚 " 的到来。
                苹果官方宣布：秋季发布会定于美西时间 9 月 14 日，北京时间 2021 年 9 月 15 日凌晨 1 点。
                <br/><br/>
                目前大概率 iPhone 新系列会命名为 iPhone 13 / Pro / Pro Max，值得一提的是，苹果秋季发布会至少包括三场，首场预计是 iPhone 专场，月底可能还有一场 AirPods 相关的发布会，也有可能会直接上架官网，10 月可能是新款 iPad 系列，11 月则是新款 MacBook Pro 2021 等系列。
                <br/><br/>
                根据历年惯例，新一代的 iOS 15 /iPadOS 15 正式版和 WatchOS 8 正式版也将降临。
                <br/><br/>
                下图为 2021 年苹果秋季发布会邀请函中国版 " 真身 "。
                <br/><br/>
                IT 之家会继续追踪报道更新消息，迎接科技节 " 春晚 " 的到来。
                苹果官方宣布：秋季发布会定于美西时间 9 月 14 日，北京时间 2021 年 9 月 15 日凌晨 1 点。
                <br/><br/>
                目前大概率 iPhone 新系列会命名为 iPhone 13 / Pro / Pro Max，值得一提的是，苹果秋季发布会至少包括三场，首场预计是 iPhone 专场，月底可能还有一场 AirPods 相关的发布会，也有可能会直接上架官网，10 月可能是新款 iPad 系列，11 月则是新款 MacBook Pro 2021 等系列。
                <br/><br/>
                根据历年惯例，新一代的 iOS 15 /iPadOS 15 正式版和 WatchOS 8 正式版也将降临。
                <br/><br/>
                下图为 2021 年苹果秋季发布会邀请函中国版 " 真身 "。
                <br/><br/>
                IT 之家会继续追踪报道更新消息，迎接科技节 " 春晚 " 的到来。
            </div>
            <div className={styles.article_publish_comment}>
                <Comment/>
            </div>
            <div className={styles.article_comments}>
                <Empty tip={'赶快写下您的第一条评论吧'}/>
            </div>
        </div>
        <ArticleShortcut/>
    </div>
}

export default Article