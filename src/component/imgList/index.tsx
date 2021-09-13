import React, { FC, useEffect, useRef, useState } from "react"

import { IMG_EXTENSIONS } from '@/util/constant.ts'
import { getFileExtension } from '@/util/util.ts'
import styles from "./index.module.less"

export interface Img {
    base64URL: string
    url: string
}
interface ImgListProps {
    observeImgChange?: (imgList: Img[]) => void
    initialFile?: File
    hideWhenFilesEmpty?: boolean
}
const ImgList: FC<ImgListProps> = ({ observeImgChange, initialFile, hideWhenFilesEmpty }) => {
    const fileRef = useRef<null | HTMLInputElement>(null)
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
    const removeImg = (index: number) => {
        const copyImgList = imgList.slice()
        copyImgList.splice(index, 1)
        setImgList(copyImgList)
    }

    useEffect(() => {
        initialFile && addImgs(initialFile)
        // eslint-disable-next-line
    }, [initialFile])
    // eslint-disable-next-line
    useEffect(() => observeImgChange?.(imgList), [imgList])

    if (hideWhenFilesEmpty && imgList.length === 0) {
        return null
    }

    return <div className={styles.img_wrap}>
        {imgList.map((img, index) => <div
            className={styles.img_item}
            key={index}
        >
            <img src={img.base64URL} alt=""/>
            <i className='iconfont icon-cancel' onClick={() => removeImg(index)}></i>
        </div>)}
        <div
            className={styles.add_img}
            onClick={() => fileRef?.current?.click()}
        >
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