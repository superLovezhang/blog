import React, { FC, useState } from "react"
import styles from "./index.module.less"

interface ImgListProps {
    observeImgChange: () => void
}
const ImgList: FC<ImgListProps> = () => {
    const [imgList, setImgList] = useState([])

    const addImg = () => {

    }

    return <div className={styles.img_wrap}>
        <div className={styles.img_item}></div>
        <div className={styles.add_img} onClick={addImg}>
            <i className='iconfont icon-add'></i>
            <input type="file"/>
        </div>
    </div>
}

export default ImgList