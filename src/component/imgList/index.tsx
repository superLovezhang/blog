import React, { FC, useEffect, useRef, useState } from "react"

import { IMG_EXTENSIONS } from '@/util/constant.ts'
import { getFileExtension } from '@/util/util.ts'
import { uploadFile } from "../../api/ossService"

import styles from "./index.module.less"


interface ImgListProps {
    observeImgChange?: (imgList: string[]) => void
    currentUploadFile?: File
    hideWhenFilesEmpty?: boolean
    maxLength?: number
}
const ImgList: FC<ImgListProps> = ({
                                       observeImgChange,
                                       currentUploadFile,
                                       hideWhenFilesEmpty ,
                                       maxLength
}) => {
    const fileRef = useRef<null | HTMLInputElement>(null)
    const [imgList, setImgList] = useState<string[]>([])

    const verifyImgFiles = (file: File) => IMG_EXTENSIONS.includes(getFileExtension(file.name))
    const addImgs = (file: File | undefined) => {
        console.log(file, IMG_EXTENSIONS, getFileExtension(file?.name ?? ''))
        if (!file || !verifyImgFiles(file)) {
            return alert('图片不正确')
        }
        if (maxLength && imgList.length > maxLength) {
            return alert(`抱歉，评论最多一次只能上传${maxLength}张图片`)
        }
        uploadFile(file)
            .then(url => setImgList(imgList.concat(url)))
            .catch(err => alert(err))
    }
    const removeImg = (index: number) => {
        const copyImgList = imgList.slice()
        copyImgList.splice(index, 1)
        setImgList(copyImgList)
    }

    useEffect(() => {
        if (currentUploadFile) {
            currentUploadFile && addImgs(currentUploadFile)
        } else {
            setImgList([])
        }
        // eslint-disable-next-line
    }, [currentUploadFile])
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
            <img src={img} alt=""/>
            <i className='iconfont icon-cancel' onClick={() => removeImg(index)}/>
        </div>)}
        <div
            className={styles.add_img}
            onClick={() => fileRef?.current?.click()}
        >
            <i className='iconfont icon-add'/>
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