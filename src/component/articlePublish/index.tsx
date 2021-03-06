import {FC, useEffect, useState} from "react"
import Multiselect from 'multiselect-react-dropdown'

import { useCategoryList } from "../../query/categoryQuery"
import { useLabelList } from "../../query/labelQuery"
import { ArticleType, PublishParameters } from "../../api/types"
import styles from "./index.module.less"

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


interface ArticlePublishProps {
    style?: { [property: string]: string }
    onPublish?: (extraParameters: PublishParameters) => void
    visible?: boolean
    defaultPublishParameters?: PublishParameters
}
const ArticlePublish: FC<ArticlePublishProps> = ({ style,
                                                     onPublish,
                                                     visible,
                                                     defaultPublishParameters
}) => {
    const { data: categoryData } = useCategoryList()
    const { data: labelData } = useLabelList()
    const [publishParameters, setPublishParameters] = useState<PublishParameters>({
        categoryId: undefined,
        labelIds: undefined,
        articleType: 'ORIGINAL',
        linkAddress: undefined
    })
    const reprintLinkVisible = ['REPRINT', 'TRANSLATE'].includes(publishParameters?.articleType ?? '')
    const categories = categoryData?.data ?? []
    const labels = labelData?.data ?? []

    useEffect(() => setPublishParameters(defaultPublishParameters ?? {}), [defaultPublishParameters])

    const validateParameters = () => {
        return Object.keys(publishParameters)
            //@ts-ignore
            .every(key => !!publishParameters[key] ||
                (key === 'linkAddress' &&
                publishParameters.articleType === 'ORIGINAL')
            )
    }
    const publishArticle = () => {
        if (!validateParameters()) {
            return alert('发布选项不完整')
        }
        onPublish?.(publishParameters)
    }
    const setCategory = (categoryId: string) => {
        setPublishParameters({ ...publishParameters, categoryId: categoryId })
    }
    const setLabels = (labelIds: string[]) => {
        setPublishParameters({ ...publishParameters, labelIds: labelIds })
    }
    const setType = (type: ArticleType) => setPublishParameters({ ...publishParameters, articleType: type })

    if (!visible) {
        return null
    }

    return <div
        className={styles.publish_option}
        style={style}
        onClick={(e) => e.stopPropagation()}
    >
        <div className={styles.category}>
            <div className={styles.top}><i className='iconfont icon-caret-up'/></div>
            <div className={styles.category_title}>分类</div>
            <div className={styles.category_list}>
                <Multiselect
                    placeholder={'请选择分类'}
                    selectedValues={categories.filter((category: any) => publishParameters.categoryId === category.categoryId)}
                    options={categories}
                    onSelect={(_, category) => setCategory(category.categoryId)}
                    displayValue="categoryName"
                    singleSelect
                />
            </div>
        </div>
        <div className={styles.label}>
            <div className={styles.label_title}>添加标签</div>
            <div className={styles.label_list}>
                <Multiselect
                    placeholder={'请选择标签'}
                    options={labels}
                    selectedValues={labels.filter((label: any) => publishParameters.labelIds?.includes(label.labelId))}
                    onSelect={(_) => setLabels(_.map((item: any) => item.labelId))}
                    onRemove={(_) => setLabels(_.map((item: any) => item.labelId))}
                    displayValue="labelName"
                />
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
                    checked={publishParameters.articleType === type.type}
                />
                {type.name}
            </label>)}
        </div>
        {reprintLinkVisible && <div className={styles.link}>
            <input
                value={publishParameters.linkAddress ?? ''}
                type="text"
                placeholder={'请输入原文链接'}
                onChange={(e) => setPublishParameters({...publishParameters, linkAddress: e.target.value})}
            />
        </div>}
        <div className={styles.confirm_button} onClick={publishArticle}>
            <i className="iconfont"/>
            <span>确认并发布</span>
        </div>
    </div>
}

export default ArticlePublish