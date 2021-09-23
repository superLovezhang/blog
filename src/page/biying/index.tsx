import {useState} from "react"

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
                {topTwo.map((pic, index) => index === 0 ? <div className={styles.today}>
                        <img src={previewImgURL(pic, '1024x768')} alt=""/>
                    </div> :
                    <div className={styles.yesterday}>
                        <img src={previewImgURL(pic, '1024x768')} alt=""/>
                    </div>)}
            </div>
        </div>
        <div className={styles.biying_pics}>
            <div className={`${styles.pic_container} clearfix`}>
                {renderItems.map(pic => <div className={styles.pic_item}>
                    <a href="">
                        <div className={styles.item_top}>
                            <img src={previewImgURL(pic)} alt=""/>
                        </div>
                        <div className={styles.item_bottom}>
                            <p>{pic.copyright}</p>
                            <div className={styles.publish_time}>
                                <i className='iconfont icon-calendar-alt'></i>
                                <span>{formatDate(pic.startdate)}</span>
                            </div>
                        </div>
                    </a>
                </div>)}
            </div>
        </div>
    </div>
}

export default BiYing