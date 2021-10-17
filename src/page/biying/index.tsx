import {useEffect, useState} from "react"

import LazyImg from "@/component/lazyImg/index.tsx"
import LoadMore from "@/component/loadMore/index.tsx"

import { useBingList } from "../../query/bingQuery"
import styles from './index.module.less'
import {usePagination} from "../../util/hook";

const BiYing = () => {
    const [pagination, nextPage] = usePagination(30)
    const { data } = useBingList({ ...pagination })
    //@ts-ignore
    const { data: picData, page, pages } = data ?? {}
    const [pictures, setPictures] = useState([])
    const topTwo = pictures.slice(0, 2)
    const renderItems = pictures.slice(2)

    const previewImgURL = (pic: any, size?: string) => `https://cn.bing.com/${pic.urlbase}_${size || '480x800'}.jpg`
    const formatDate = (date: string) => `${date.slice(0, 4)}-${date.slice(4 ,6)}-${date.slice(6)}`
    useEffect(() => setPictures(pictures.concat(picData ?? [])), [data])

    return <div className={styles.biying_wrap}>
        <div className={styles.biying_top}>
            <div className={styles.top_container}>
                {topTwo.map((pic: any, index: number) => index === 0 ? <div key={index} className={styles.today}>
                        <LazyImg url={previewImgURL(pic, '1024x768')}/>
                        <div className={styles.wallpaper_message}>
                            <div className={styles.top_date}>
                                <h3>今日必应壁纸</h3>
                                <span>{formatDate(pic.startdate)}</span>
                            </div>
                            <div className={styles.detail_info}>{pic.copyright}</div>
                        </div>
                    </div> :
                    <div className={styles.yesterday}>
                        <LazyImg url={previewImgURL(pic, '1024x768')}/>
                        <div className={styles.wallpaper_message}>
                            <div className={styles.top_date}>
                                <h3>昨日必应壁纸</h3>
                                <span>{formatDate(pic.startdate)}</span>
                            </div>
                            <div className={styles.detail_info}>{pic.copyright}</div>
                        </div>
                    </div>)}
            </div>
        </div>
        <div className={styles.biying_pics}>
            <div className={`${styles.pic_container}`}>
                <div className='clearfix'>
                    {renderItems.map((pic: any) => <div key={pic._id} className={styles.pic_item}>
                        <a href="https://twitter.com">
                            <div className={styles.item_top}>
                                <LazyImg url={previewImgURL(pic)}/>
                            </div>
                            <div className={styles.item_bottom}>
                                <p>{pic.copyright}</p>
                                <div className={styles.publish_time}>
                                    <i className='iconfont icon-calendar-alt'/>
                                    <span>{formatDate(pic.startdate)}</span>
                                </div>
                            </div>
                        </a>
                    </div>)}
                </div>
                <LoadMore hasMore={page < pages} loadMore={() => nextPage()}/>
            </div>
        </div>
    </div>
}

export default BiYing