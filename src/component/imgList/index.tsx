import React, { FC, useEffect, useRef, useState } from "react"

import { IMG_EXTENSIONS } from '@/util/constant.ts'
import { getFileExtension } from '@/util/util.ts'
import styles from "./index.module.less"

interface Img {
    base64URL: string
    url: string
}
interface ImgListProps {
    observeImgChange?: (imgList: Img[]) => void
    initialFile?: File
}
const ImgList: FC<ImgListProps> = ({ observeImgChange, initialFile }) => {
    const fileRef = useRef(null)
    const [imgList, setImgList] = useState<Img[]>([])

    const verifyImgFiles = (file: File) => IMG_EXTENSIONS.includes(getFileExtension(file.name))
    const uploadFile = (file: File) => {
        let fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = (e) => {
            const base64URL = e?.target?.result
            if (base64URL && typeof base64URL === 'string') {
                setImgList(imgList.concat([{ base64URL, url: '' }]))
            }
        }
    }
    const addImgs = (file: File | undefined) => {
        if (!file || !verifyImgFiles(file)) {
            return alert('图片不正确')
        }
        uploadFile(file)
    }

    useEffect(() => {
        initialFile && addImgs(initialFile)
        // eslint-disable-next-line
    }, [])
    // eslint-disable-next-line
    useEffect(() => observeImgChange?.(imgList), [imgList])

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
                type="file"
                ref={fileRef}
                style={{ display: 'none' }}
                onChange={(e) => addImgs(e?.target?.files?.[0])}
            />
        </div>
    </div>
}

export default ImgList