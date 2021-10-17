import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { IEmojiData } from "emoji-picker-react"

import EmojiPicker from "@/component/emojiPicker/index.tsx"
import ImgList from "@/component/imgList/index.tsx"

import { useUserInfo } from "../../query/userQuery"
import { useComment } from "../../query/commentQuery"
import { Img } from "../../api/types"
import { objectIsNull } from "../../util/util"
import styles from "./index.module.less"

interface CommentProps {
    buttonBgColor?: string
    articleId?: string
}
const PublishComment: FC<CommentProps> = ({ buttonBgColor = '#0084ff,#3fe6fe', articleId }) => {
    const { data } = useUserInfo()
    const user = data?.data
    const { mutateAsync, error, isError } = useComment()
    const [comment, setComment] = useState('')
    const [emojiVisible, setEmojiVisible] = useState(false)
    const [imgFile, setImgFile] = useState<undefined | File>()
    const [files, setFiles] = useState<Img[] | []>([])
    const fileRef = useRef<null | HTMLInputElement>(null)
    const hasLogin = !objectIsNull(user)
    const { publishButtonBg, avatar, username } = useMemo(() => ({
        publishButtonBg: hasLogin ? `linear-gradient(135deg,${buttonBgColor})` : '#ccc',
        avatar: hasLogin ? user.avatar : 'https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100',
        username: hasLogin ? user.username : '游客'
    }), [user, buttonBgColor, hasLogin])

    const publish = async () => {
        await mutateAsync({
            articleId,
            content: comment,
            pics: files.map(file => file.url).join(',')
        })
        setComment('')
    }
    useEffect(() => {
        window.onclick= (e) => setEmojiVisible(false)
        return () => {  window.onclick = null }
    }, [])
    useEffect(() => {
        if (isError) {
            alert(error)
        }
    }, [isError, error])

    return <div className={styles.article_publish_comment}>
        <div className={styles.avatar}>
            <img src={avatar} alt=""/>
        </div>
        <div className={styles.comment_part}>
            <div className={styles.username}>{username}</div>
            <div className={styles.comment_textarea}>
                <textarea
                    placeholder="写下你的想法"
                    maxLength={200}
                    value={comment}
                    autoFocus
                    onChange={(e) => setComment(e.target.value ?? '')}
                />
            </div>
            <div className={`${styles.comment_insert} clearfix`}>
                <div className={styles.insert_item}>
                    <div className="emotion_symbol" onClick={(e) => {
                        setEmojiVisible(!emojiVisible)
                        e.stopPropagation()
                    }}>
                        <i className={'iconfont icon-emotion-fill'}/>
                        <span>表情</span>
                    </div>
                    <div className={styles.emoji_picker}>
                        <EmojiPicker
                            visible={emojiVisible}
                            callback={(data: IEmojiData) => setComment(comment + data.emoji)}
                        />
                    </div>
                </div>
                <div
                    className={styles.insert_item}
                    onClick={() => fileRef?.current?.click()}
                >
                    <i className={'iconfont icon-picture-fill'}/>
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
                    style={{ background: publishButtonBg }}
                    onClick={publish}
                >发布</div>
            </div>
            <div className={styles.comment_img}>
                <ImgList
                    observeImgChange={(files: any) => setFiles(files)}
                    initialFile={imgFile}
                    maxLength={5}
                    hideWhenFilesEmpty={true}
                />
            </div>
        </div>
    </div>
}

export default PublishComment