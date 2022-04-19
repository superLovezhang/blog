import { FC, useEffect, useState } from "react"

import LoadMore from "../../component/loadMore"
import Empty from "../../component/empty"
import ArticleItem from "../../component/articleItem"

import { bingPicURL } from "../../util/util"
import { useUserInfo } from "../../query/userQuery"
import { useTodayPaper } from '../../query/bingQuery'
import { useArticleList } from "../../query/articleQuery"
import { usePagination } from "../../util/hook"
import { ArticleVO } from "../../api/types"
import styles from './index.module.less'
import {QUOTES} from "../../util/constant";

const ARTICLE_LIST = [
    {
        title: '我的文章',
        key: 1
    },
    {
        title: '我的收藏',
        key: 2
    },
    {
        title: '我的回答',
        key: 3
    }
]
interface PersonalPageProps {

}
const PersonalPage: FC<PersonalPageProps> = () => {
    const [pagination, nextPage, resetPagination] = usePagination()
    const [currentActived, setCurrentActived] = useState(1)
    const [quote, setQuote] = useState(QUOTES[Math.floor(Math.random() * 5)])
    const { data } = useTodayPaper()
    const { data: userData } = useUserInfo()
    const { data: articleData } = useArticleList({ key: currentActived, ...pagination })
    const { records, next } = articleData?.data ?? {}
    const user = userData?.data
    const image = data?.data?.images?.[0] ?? undefined
    const wallpaper = image && bingPicURL(image, '1920x1080')

    const toggleType = (type: number) => {
        setCurrentActived(type)
        resetPagination()
    }

    return <div className={styles.personal_page_wrap}>
        <div className={styles.left_side}>
            <div className={styles.user_info}>
                <div
                    className={styles.user_background}
                    style={{ backgroundImage: `url(${wallpaper})` }}
                />
                <div className={styles.user_detail}>
                    <div className={styles.user_avatar}>
                        <img src={user?.avatar} alt="头像"/>
                    </div>
                    <div className={styles.user_detail_box}>
                        <h4>{user?.username}</h4>
                        <p>{ quote }</p>
                    </div>
                </div>
            </div>
            <div className={styles.user_article}>
                <div className={styles.article_type}>
                    {ARTICLE_LIST.map(type => <div
                        onClick={() => toggleType(type.key)}
                        className={`${styles.type_item} ${currentActived === type.key && styles.active}`}
                        key={type.key}>
                        {type.title}
                    </div>)}
                </div>
                <div className={styles.article_list}>
                    {records?.map((article: ArticleVO) => <ArticleItem article={article} key={article.articleId} edit/>)}
                    {!records?.length && <Empty/>}
                    <LoadMore hasMore={next} loadMore={nextPage}/>
                </div>
            </div>
        </div>
        <div className={styles.right_side}>
            <h3>个人主页</h3>
        </div>
    </div>
}

export default PersonalPage