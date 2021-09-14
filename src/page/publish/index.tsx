import { useState } from "react"

import MarkdownEditor from '@/component/markdownEditor/index.tsx'
import Empty from "@/component/empty/index.tsx"
import styles from './index.module.less'

const Publish = () => {
    const [content, setContent] = useState('')

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
                <Empty/>
                {/*<div className={styles.draft_item}>*/}
                {/*    <h3>文章标题</h3>*/}
                {/*    <div className={styles.item_bottom}>*/}
                {/*        <div className={styles.item_time}>刚刚</div>*/}
                {/*        <i className="iconfont icon-rubbish-icon"></i>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
        <div className={styles.markdown_editor}>
            <div className={styles.editor_top}></div>
            <MarkdownEditor style={{ height: '80vh', backgroundColor: 'var(--main-bg-color)' }} setMdContent={setContent}/>
        </div>
    </div>
}

export default Publish