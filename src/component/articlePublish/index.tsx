import styles from "./index.module.less";
import {FC, useState} from "react";

const categories = [
    {
        id: 1,
        name: '资讯'
    },
    {
        id: 2,
        name: '前端'
    },
    {
        id: 3,
        name: '后端'
    },
    {
        id: 4,
        name: '人生感悟'
    },
    {
        id: 5,
        name: '阅读'
    }
]
const labels = [
    {
        id: 1,
        name: 'vue'
    },
    {
        id: 2,
        name: 'react'
    },
    {
        id: 3,
        name: 'nginx'
    },
    {
        id: 4,
        name: 'vue3'
    },
    {
        id: 5,
        name: 'webpack'
    },
]
const types: { name: string, type: ArticleType }[] = [
    {
        name: '原创',
        type: 'ORIGINAL'
    },
    {
        name: '转载',
        type: 'REPRINT'
    },
    {
        name: '翻译',
        type: 'TRANSLATE'
    }
]

type ArticleType = 'ORIGINAL' | 'REPRINT' | 'TRANSLATE'
export interface ExtraParameters {
    category?: number
    labels?: number[]
    type?: ArticleType
    reprintLink?: string
}
interface ArticlePublishProps {
    style?: { [property: string]: string}
    onPublish?: (extraParameters: ExtraParameters) => void
    visible?: boolean
}
const ArticlePublish: FC<ArticlePublishProps> = ({ style, onPublish, visible }) => {
    const [extraParameters, setExtraParameters] = useState<ExtraParameters>({})
    const reprintLinkVisible = ['REPRINT', 'TRANSLATE'].includes(extraParameters?.type ?? '')

    const publishArticle = () => {
        console.log(extraParameters)
        onPublish?.(extraParameters)
    }
    const setType = (type: ArticleType) => setExtraParameters({ ...extraParameters, type })

    if (!visible) {
        return null
    }

    return <div
        className={styles.publish_option}
        style={style}
        onClick={(e) => e.stopPropagation()}
    >
        <div className={styles.category}>
            <div className={styles.top}><i className='iconfont icon-caret-up'></i></div>
            <div className={styles.category_title}>分类</div>
            <div className={styles.category_list}>
                {categories.map((category => <div
                    className={styles.category_item}
                    key={category.id}
                    onClick={() => setExtraParameters({...extraParameters, category: category.id})}
                >{category.name}</div>))}
            </div>
        </div>
        <div className={styles.label}>
            <div className={styles.label_title}>添加标签</div>
            <div className={styles.label_list}>
                {labels.map(label => <div
                    className={styles.label_item}
                    key={label.id}
                    onClick={() => setExtraParameters({...extraParameters, labels: (extraParameters?.labels ?? []).concat([label.id])})}
                >{label.name}</div>)}
            </div>
        </div>
        <div className={styles.type}>
            {types.map(type => <label
                key={type.type}
                className={styles.type_item}
                onClick={() => setType(type.type)}
            >
                <input
                    type="radio"
                    name="type"
                    checked={extraParameters.type === type.type}
                />
                {type.name}
            </label>)}
        </div>
        {reprintLinkVisible && <div className={styles.link}>
            <input
                value={extraParameters.reprintLink ?? ''}
                type="text"
                placeholder={'请输入原文链接'}
                onChange={(e) => setExtraParameters({...extraParameters, reprintLink: e.target.value})}
            />
        </div>}
        <div className={styles.confirm_button} onClick={publishArticle}>
            <i className="iconfont"></i>
            <span>确认并发布</span>
        </div>
    </div>
}

export default ArticlePublish