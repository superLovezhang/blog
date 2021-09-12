import React, { ChangeEvent, FC, useRef, useState } from "react"

import { IMG_EXTENSIONS } from '@/util/constant.ts'
import { getFileExtension } from '@/util/util.ts'
import styles from "./index.module.less"

interface Img {
    base64URL: string
    url: string
}
interface ImgListProps {
    observeImgChange: () => void
}
const ImgList: FC<ImgListProps> = () => {
    const fileRef = useRef(null)
    const [imgList, setImgList] = useState<Img[]>([])

    const verifyImgFiles = (files: FileList) => {
        for (let key in files) {
            const file = files[key]
            if (!IMG_EXTENSIONS.includes(getFileExtension(file.name)) || file.size === 0) {
                return false
            }
        }
        return true
    }
    const addImgs = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files || verifyImgFiles(files)) {
            return alert('图片不正确')
        }
        // correct image files
    }

    return <div className={styles.img_wrap}>
        {imgList.map((img, index) => <div
            className={styles.img_item}
            key={index}
        >
            <img src={img.base64URL} alt=""/>
        </div>)}
        <div
            className={styles.add_img}
            onClick={() => {
                //@ts-ignore
                fileRef?.current?.click()
            }}>
            <i className='iconfont icon-add'></i>
            <input
                multiple
                type="file"
                ref={fileRef}
                style={{ display: 'none' }}
                onChange={addImgs}
            />
        </div>
    </div>
}

export default ImgList