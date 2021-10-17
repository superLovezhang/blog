import React, {FC, useEffect, useState} from 'react'

import {bingInfo, downloadImage} from "../../../util/util"
import styles from './index.module.less'

interface BingDetailProps {
    picture: any
    visible: boolean
    close: () => void
}
const BingDetail: FC<BingDetailProps> = ({ picture, visible, close }) => {
    const fullScreen = (e: any) => {
        console.log(e)
        if (!!document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            e.currentTarget.requestFullscreen()
        }
    }
    const picInfo = bingInfo(picture) ?? {}
    useEffect(() => {
        document.onkeyup = e => {
            if (e.keyCode === 27) {
                close()
            }
        }
        return () => { document.onkeyup = null }
        // eslint-disable-next-line
    }, [])

    if (!visible) {
        return null
    }
    return <div className={styles.bing_detail_wrap}>
        <div className={styles.scroll_container}>
            <div
                className={styles.top_part}
                style={{ backgroundImage: `url('${picture.fullSrc}')` }}
                onClick={fullScreen}
            >
                <div className={styles.pic_mask}>
                    <div className={styles.right_top_operations}>
                        <i className="iconfont icon-cancel" onClick={(e) => {
                            e.stopPropagation()
                            close()
                        }}/>
                        <i className="iconfont icon-download" onClick={(e) => {
                            e.stopPropagation()
                            downloadImage(picture.fullSrc, picture.copyright.split('，')[0])
                        }}/>
                    </div>
                    <div className={styles.picture_info}>
                        <h3>{picInfo.title}</h3>
                        <div className={styles.second_info}>
                            <i className='iconfont icon-location'/>
                            {picInfo.address}
                            <i className='iconfont icon-calendar-alt'/>
                            {picInfo.date}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom_part}>
                <a href={picture.copyrightlink} target="_blank" className={styles.pic_introduce}>{picture.copyright}</a>
                <div className={styles.download_part}>
                    <div className={styles.download_item}>
                        <div className={styles.download_left}>
                            <i className='iconfont icon-diannao'/>
                            <span>电脑壁纸 1920*1080</span>
                        </div>
                        <div className={styles.download_right} onClick={() => downloadImage(picInfo.pc, picInfo.title)}>
                            <i className='iconfont icon-download'/>
                            <span>立即下载</span>
                        </div>
                    </div>
                    <div className={styles.download_item}>
                        <div className={styles.download_left}>
                            <i className='iconfont icon-k-line'/>
                            <span>4K壁纸 3840*2592</span>
                        </div>
                        <div
                            className={styles.download_right}
                            onClick={() => downloadImage(picInfo.uhd, picInfo.title)}
                        >
                            <i className='iconfont icon-download'/>
                            <span>立即下载</span>
                        </div>
                    </div>
                    <div className={styles.download_item}>
                        <div className={styles.download_left}>
                            <i className='iconfont icon-shouji'/>
                            <span>手机壁纸 720*1280</span>
                        </div>
                        <div className={styles.download_right} onClick={() => downloadImage(picInfo.mobile, picInfo.title)}>
                            <i className='iconfont icon-download'/>
                            <span>立即下载</span>
                        </div>
                    </div>
                </div>
                <div className={styles.tips}>tips:键盘上的ESC键可以快速关闭弹出页面哦😘</div>
            </div>
        </div>
    </div>
}

export default BingDetail