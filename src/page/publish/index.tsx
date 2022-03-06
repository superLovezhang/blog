import {useEffect, useMemo, useState} from "react"
import moment from "moment"

import MarkdownEditor from '@/component/markdownEditor/index.tsx'
import Empty from "@/component/empty/index.tsx"
import ArticlePublish from "@/component/articlePublish/index.tsx"

import { usePermissionDetail, useSaveArticle } from "../../query/articleQuery"
import { className } from '@/util/util.ts'
import { useParams } from "../../util/hook"
import { ArticleVO, PublishParameters } from "../../api/types"
import styles from './index.module.less'
import {Debugger} from "inspector";

interface Draft {
    id?: string
    title?: string
    content?: string
    editTime: number
    publishParameters?: PublishParameters
}
const Publish = () => {
    const { mutate, isError, error } = useSaveArticle()
    const [htmlContent, setHtmlContent] = useState('')
    const [drafts, setDrafts] = useState<Draft[]>(JSON.parse(window.localStorage.getItem('drafts') ?? '[]') || [])
    const [draftIndex, setDraftIndex] = useState(0)
    const [showPublishSetting, setShowPublishSetting] = useState(false)
    const isEmpty = useMemo(() => drafts.length === 0, [drafts])
    const draft = useMemo(() => drafts[draftIndex] ?? {}, [draftIndex, drafts])
    const disablePublish = !draft.title || !draft.content
    const articleId = useParams()['articleId']
    const { data: articleData } = usePermissionDetail(articleId)
    //@ts-ignore
    const article: ArticleVO = articleData?.data
    console.log('current article is: ' , article, 'articleId: ', articleId)

    const defaultTitle = () => {
        const currentMoment = moment(new Date())
        return `${currentMoment.year()}-${currentMoment.month() + 1}-${currentMoment.date()}`
    }
    const createDefaultDraft = (text?: string, title?: string) => {
        return {
            title: title,
            content: text,
            editTime: new Date().getTime()
        }
    }
    const editDraft = (text?: string, title?: string) => {
        return Object.assign(draft, {
            title: title ?? draft.title,
            content: text,
            editTime: new Date().getTime()
        })
    }
    const pickADraft = (text?: string, title?: string) => {
        return (isEmpty && !title) ? createDefaultDraft(text, defaultTitle()) : editDraft(text, title)
    }
    const preserveDrafts = (drafts: Draft[]) => {
        window.localStorage.setItem('drafts', JSON.stringify(drafts))
        setDrafts(drafts)
        // draftIndex > drafts.length - 1 && setDraftIndex(drafts.length - 1)
    }
    const createPreserveDrafts = (drafts: Draft[]) => {
        preserveDrafts(drafts)
        setDraftIndex(drafts.length - 1)
    }
    const removePreserveDrafts = (drafts: Draft[]) => {
        preserveDrafts(drafts)
        draftIndex > drafts.length - 1 && setDraftIndex(Math.max(drafts.length - 1, 0))
    }
    const editArticleContent = (text?: string, title?: string) => {
        const cloneDrafts = drafts.splice(0)
        cloneDrafts[draftIndex] = pickADraft(text, title)
        preserveDrafts(cloneDrafts)
    }
    const removeOneFromDrafts = (index: number) => {
        const cloneDrafts = drafts.splice(0)
        cloneDrafts.splice(index, 1)
        removePreserveDrafts(cloneDrafts)
    }
    const newDrafts = (draft?: Draft) => {
        const cloneDrafts = drafts.splice(0)
        cloneDrafts.push(draft ?? createDefaultDraft())
        return cloneDrafts
    }
    function createNewDraft() : void;
    function createNewDraft(draft: Draft): void;
    function createNewDraft(draft?: Draft): void {
        createPreserveDrafts(newDrafts(draft))
    }
    const publishArticle = (publishParameters: any) => {
        mutate({ articleName: draft.title, content: draft.content, articleId: draft.id, htmlContent, ...publishParameters })
    }
    const assemblyPublishParameters = (article: ArticleVO) => {
        debugger
        return {
            categoryId: article.category.categoryId,
            labelIds: article.labels.map(label => label.labelId),
            articleType: article.articleType,
            linkAddress: article.linkAddress
        } as PublishParameters
    }
    const assemblyDraft = (article: ArticleVO) => {
        return {
            publishParameters: assemblyPublishParameters(article),
            content: article.content,
            id: article.articleId,
            title: article.articleName,
            editTime: new Date().getTime()
        } as Draft
    }
    const removeNavigationParameters = () => {
        window.history.replaceState(null, '', window.location.href.replace(window.location.search, ''))
    }
    const editPublishedArticle = (article: ArticleVO) => {
        createNewDraft(assemblyDraft(article))
        removeNavigationParameters()
    }

    /**
     * 如果路由有id就去数据库查询当前文章数据 √
     * 然后写入localstorage中
     * 然后移除路由id 防止重复写入
     */
    useEffect(() => {
        if (!!articleId && !!article) {
            editPublishedArticle(article)
        }
    }, [articleId, article])
    useEffect(() => {
        window.onclick = () => setShowPublishSetting(false)
        return () => { window.onclick = null }
    }, [])
    //@ts-ignore
    useEffect(() => isError && alert(error), [isError, error])

    return <div className={styles.publish_wrap}>
        <div className={styles.draft_bar}>
            <div className={styles.draft_top}>
                <h3>草稿箱</h3>
                <div
                    className={styles.operate}
                    onClick={createNewDraft}
                >
                    <i className='iconfont icon-add1'/>
                    <span>新建草稿</span>
                </div>
            </div>
            <div className={styles.draft_list}>
                {isEmpty ? <Empty/> : drafts.map((draft, index) => {
                    const classNames = className({
                        [styles.draft_item] : true,
                        active: draftIndex === index
                    })
                    return <div
                        className={classNames}
                        key={index}
                        onClick={() => setDraftIndex(index)}
                    >
                        <h3>{draft.title ?? '无标题文章'}</h3>
                        <div className={styles.item_bottom}>
                            <div className={styles.item_time}>{moment(draft.editTime).fromNow()}</div>
                            <i className="iconfont icon-rubbish-icon" onClick={(e) => {
                                removeOneFromDrafts(index)
                                e.stopPropagation()
                            }}/>
                        </div>
                    </div>
                })}
            </div>
        </div>
        <div className={styles.markdown_editor}>
            <div className={styles.editor_top}>
                <input
                    type="text"
                    placeholder={'请输入标题（不超过50字）'}
                    maxLength={50}
                    value={draft.title ?? ''}
                    onChange={(e) => editArticleContent(draft.content, e.target.value)}
                />
                {disablePublish ?
                    <div className={`${styles.publish_button} ${styles.disable}`}>发布</div> :
                    <div
                        className={styles.publish_button}
                        onClick={(e) => {
                            setShowPublishSetting(!showPublishSetting)
                            e.stopPropagation()
                        }}
                    >发布</div>}
                <ArticlePublish
                    style={{ top: '45px', right: '10px' }}
                    visible={showPublishSetting}
                    onPublish={(params: any) => publishArticle(params)}
                    defaultPublishParameters={draft.publishParameters ?? {}}
                />
            </div>
            <MarkdownEditor
                value={draft.content ?? ''}
                style={{
                    height: '80vh',
                    backgroundColor: 'var(--main-bg-color)',
                    color: 'inherit',
                    border: '1px solid var(--border-line-color)'
                }}
                immediateSetHtml={draftIndex}
                setMdContent={editArticleContent}
                setHtmlContent={(html: string) => setHtmlContent(html)}
            />
        </div>
    </div>
}

export default Publish