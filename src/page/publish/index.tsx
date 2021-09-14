import { useMemo, useState, useRef } from "react"
import moment from "moment"

import MarkdownEditor from '@/component/markdownEditor/index.tsx'
import Empty from "@/component/empty/index.tsx"
import styles from './index.module.less'

interface Draft {
    title: string
    content: string | undefined
    editTime: number
}
const Publish = () => {
    const [drafts, setDrafts] = useState<Draft[]>(JSON.parse(window.localStorage.getItem('drafts') ?? '[]') || [])
    const [draftIndex, setDraftIndex] = useState(0)
    const currentEditDraft = useRef<Draft | {}>({})
    const isEmpty = useMemo(() => drafts.length === 0, [drafts])
    const draft = drafts[draftIndex] ?? {}

    const currentTime = () => new Date()
    const createDefaultDraft = (text?: string, title?: string) => {
        const currentMoment = moment(currentTime())
        return {
            title: title ?? `${currentMoment.year()}-${currentMoment.month()}-${currentMoment.date()}`,
            content: text,
            editTime: currentTime().getTime()
        }
    }
    const editDraft = (text?: string, title?: string) => {
        return Object.assign(draft, {
            title: title ?? draft.title,
            content: text,
            editTime: currentTime().getTime()
        })
    }
    const pickADraft = (text?: string, title?: string) => {
        return isEmpty ? createDefaultDraft(text, title) : editDraft(text, title)
    }
    const preserveDrafts = (drafts: Draft[]) => {
        window.localStorage.setItem('drafts', JSON.stringify(drafts))
        setDrafts(drafts)
    }
    const editArticleContent = (text?: string, title?: string) => {
        const cloneDrafts = drafts.splice(0)
        cloneDrafts[draftIndex] = pickADraft(text, title)
        preserveDrafts(cloneDrafts)
    }
    const removeOneFromDrafts = (index: number) => {
        const cloneDrafts = drafts.splice(0)
        cloneDrafts.splice(index, 1)
        preserveDrafts(cloneDrafts)
    }

    return <div className={styles.publish_wrap}>
        <div className={styles.draft_bar}>
            <div className={styles.draft_top}>
                <h3>草稿箱</h3>
                <div className={styles.operate}>
                    <i className='iconfont icon-add1'></i>
                    <span>新建草稿</span>
                </div>
            </div>
            <div className={styles.draft_list}>
                {isEmpty ? <Empty/> : drafts.map((draft, index) => <div
                    className={styles.draft_item}
                    key={index}
                    onClick={() => setDraftIndex(index)}
                >
                    <h3>{draft.title}</h3>
                    <div className={styles.item_bottom}>
                        <div className={styles.item_time}>{moment(draft.editTime).fromNow()}</div>
                        <i className="iconfont icon-rubbish-icon" onClick={() => removeOneFromDrafts(index)}></i>
                    </div>
                </div>)}
            </div>
        </div>
        <div className={styles.markdown_editor}>
            <div className={styles.editor_top}>
                <input
                    type="text"
                    placeholder={'请输入标题（不超过50字）'}
                    maxLength={50}
                    value={draft.title}
                    onChange={(e) => editArticleContent(draft.content, e.target.value)}
                />
                <div className={`${styles.publish_button} ${styles.disable}`}>发布</div>
            </div>
            <MarkdownEditor
                value={draft.content}
                style={{ height: '80vh', backgroundColor: 'var(--main-bg-color)' }}
                setMdContent={editArticleContent}
            />
        </div>
    </div>
}

export default Publish