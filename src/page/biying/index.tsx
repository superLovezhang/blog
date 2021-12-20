import {useEffect, useState} from "react"

import LazyImg from "@/component/lazyImg/index.tsx"
import LoadMore from "@/component/loadMore/index.tsx"

import BingDetail from "./bingDetail"
import { useBingList } from "../../query/bingQuery"
import { usePagination } from "../../util/hook"
import { bingDateFormat, bingPicURL } from "../../util/util"
import styles from './index.module.less'

const BiYing = () => {
    const [pagination, nextPage] = usePagination(30, false)
    const { data } = useBingList({ ...pagination })
    //@ts-ignore
    const { data: picData, page, pages } = data ?? {}
    const [pictures, setPictures] = useState([])
    const [picture, setPicture] = useState()
    const [detailVisible, setDetailVisible] = useState(false)
    const topTwo = pictures.slice(0, 2)
    const renderItems = pictures.slice(2)

    useEffect(() => setPictures(pictures.concat(picData ?? [])), [data])

    return <div className={styles.biying_wrap}>
        <div className={styles.biying_top}>
            <div className={styles.top_container}>
                {topTwo.map((pic: any, index: number) => <div
                    key={index}
                    onClick={() => {
                        setPicture(pic)
                        setDetailVisible(true)
                    }}
                    className={`${styles.today} ${index === 1 && styles.yesterday}`}
                >
                    <LazyImg url={bingPicURL(pic, '1024x768')}/>
                    <div className={styles.wallpaper_message}>
                        <div className={styles.top_date}>
                            <h3>{index === 1 ? '昨日' : '今日'}必应壁纸</h3>
                            <span>{bingDateFormat(pic.startdate)}</span>
                        </div>
                        <div className={styles.detail_info}>{pic.copyright}</div>
                    </div>
                </div>)}
            </div>
        </div>
        <div className={styles.biying_pics}>
            <div className={`${styles.pic_container}`}>
                <div className='clearfix'>
                    {renderItems.map((pic: any) => <div
                        key={pic._id}
                        className={styles.pic_item}
                        onClick={() => {
                            setPicture(pic)
                            setDetailVisible(true)
                        }}
                    >
                        <a href="javascript:;">
                            <div className={styles.item_top}>
                                <LazyImg url={bingPicURL(pic)}/>
                            </div>
                            <div className={styles.item_bottom}>
                                <p>{pic.copyright}</p>
                                <div className={styles.publish_time}>
                                    <i className='iconfont icon-calendar-alt'/>
                                    <span>{bingDateFormat(pic.startdate)}</span>
                                </div>
                            </div>
                        </a>
                    </div>)}
                </div>
                <LoadMore hasMore={page < pages} loadMore={() => nextPage()}/>
            </div>
        </div>
        <BingDetail picture={picture} visible={detailVisible} close={() => setDetailVisible(false)}/>
    </div>
}

export default BiYing