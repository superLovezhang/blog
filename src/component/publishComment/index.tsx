import React, {FC, useEffect, useRef, useState} from "react"
import { IEmojiData } from "emoji-picker-react"

import EmojiPicker from "@/component/emojiPicker/index.tsx"
import ImgList from "@/component/imgList/index.tsx"

import styles from "./index.module.less"

interface CommentProps {
    buttonBgColor?: string
}
const Comment: FC<CommentProps> = ({ buttonBgColor = '#0084ff,#3fe6fe' }) => {
    const [emojiVisible, setEmojiVisible] = useState(false)
    const [comment, setComment] = useState('')
    const [imgFile, setImgFile] = useState<undefined | File>()
    const [, setFiles] = useState([])
    const fileRef = useRef<null | HTMLInputElement>(null)

    const editComment = (comment: string) => {
        setComment(comment)
    }
    useEffect(() => {
        window.onclick= (e) => setEmojiVisible(false)
        return () => {  window.onclick = null }
    }, [])

    return <div className={styles.article_publish_comment}>
        <div className={styles.avatar}>
            <img src="https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100" alt=""/>
        </div>
        <div className={styles.comment_part}>
            <div className={styles.username}>superLovezhang</div>
            <div className={styles.comment_textarea}>
                        <textarea
                            placeholder="写下你的想法"
                            maxLength={200}
                            value={comment}
                            onChange={(e) => editComment(e.target.value ?? '')}
                        />
            </div>
            <div className={`${styles.comment_insert} clearfix`}>
                <div className={styles.insert_item}>
                    <div className="emotion_symbol" onClick={(e) => {
                        setEmojiVisible(!emojiVisible)
                        e.stopPropagation()
                    }}>
                        <i className={'iconfont icon-emotion-fill'}></i>
                        <span>表情</span>
                    </div>
                    <div className={styles.emoji_picker}>
                        <EmojiPicker
                            visible={emojiVisible}
                            callback={(data: IEmojiData) => editComment(comment + data.emoji)}
                        />
                    </div>
                </div>
                <div
                    className={styles.insert_item}
                    onClick={() => fileRef?.current?.click()}
                >
                    <i className={'iconfont icon-picture-fill'}></i>
                    <span>图片</span>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        ref={fileRef}
                        onChange={(e) => setImgFile(e?.target?.files?.[0])}
                    />
                </div>
                <div
                    className={styles.publish_button}
                    style={{ background: `linear-gradient(135deg,${buttonBgColor})` }}>发布</div>
            </div>
            <div className={styles.comment_img}>
                <ImgList
                    observeImgChange={(files: any) => setFiles(files)}
                    initialFile={imgFile}
                    hideWhenFilesEmpty={true}
                />
            </div>
        </div>
    </div>
}

export default Comment