import { useState } from "react"

import LazyImg from "@/component/lazyImg/index.tsx"
import LoadMore from "@/component/loadMore/index.tsx"

import styles from './index.module.less'
import pics from './biyingPic.json'

const BiYing = () => {
    const [pictures, setPictures] = useState(pics)
    const topTwo = pictures.slice(0, 2)
    const renderItems = pictures.slice(2)

    const previewImgURL = (pic: any, size?: string) => `https://cn.bing.com/${pic.urlbase}_${size || '480x800'}.jpg`
    const formatDate = (date: string) => `${date.slice(0, 5)}-${date.slice(5 ,7)}-${date.slice(7)}`

    return <div className={styles.biying_wrap}>
        <div className={styles.biying_top}>
            <div className={styles.top_container}>
                {topTwo.map((pic, index) => index === 0 ? <div key={index} className={styles.today}>
                        <LazyImg url={previewImgURL(pic, '1024x768')}/>
                    </div> :
                    <div className={styles.yesterday}>
                        <LazyImg url={previewImgURL(pic, '1024x768')}/>
                    </div>)}
            </div>
        </div>
        <div className={styles.biying_pics}>
            <div className={`${styles.pic_container}`}>
                <div className='clearfix'>
                    {renderItems.map(pic => <div key={pic._id} className={styles.pic_item}>
                        <a href="javascript:void(0)">
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
                <LoadMore hasMore={true}/>
            </div>
        </div>
    </div>
}

export default BiYing