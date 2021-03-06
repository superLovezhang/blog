import { FC } from "react"

import { ArticleQueryParams, Category as CategoryType, Label } from '../../api/types'
import { useCategoryList } from "../../query/categoryQuery"
import { useLabelList } from "../../query/labelQuery"

import styles from './index.module.less'

interface CategoryProps {
    queryParams: ArticleQueryParams
    changeQueryParams: (params: { labelId: string, categoryId: string } | {}) => void
}
const Category: FC<CategoryProps> = ({ changeQueryParams, queryParams }) => {
    const { data: categoryData } = useCategoryList()
    const { data: labelData } = useLabelList()
    const { categoryId, labelId } = queryParams
    const categories = categoryData?.data ?? []
    const labels = labelData?.data ?? []

    return <div className={styles.category_wrap}>
        <div className={styles.category_top}>
            <h3>首页</h3>
        </div>
        <div className={`${styles.category_list} ${styles.list}`}>
            <div
                onClick={() => changeQueryParams({ categoryId: undefined, labelId: undefined })}
                className={`${styles.category_item} ${styles.item} ${!categoryId && !labelId && 'active'}`}
            >
                <i className={'iconfont icon-biaoqiankuozhan_tuijian-126'}/>
                <span>推荐</span>
            </div>
            {categories.map((category: CategoryType) => <div
                key={category.categoryId}
                className={`${styles.category_item} ${styles.item} ${categoryId === category.categoryId && 'active'}`}
                onClick={() => changeQueryParams({ categoryId: category.categoryId, labelId: undefined })}
            >
                <i className={`iconfont ${category.iconClass}`}/>
                <span>{category.categoryName}</span>
            </div>)}
        </div>
        <div className={`${styles.tag_list} ${styles.list}`}>
            {labels.map((label: Label) => <div
                key={label.labelId}
                onClick={() => changeQueryParams({ labelId: label.labelId, categoryId: undefined })}
                className={`${styles.tag_item} ${styles.item} ${labelId === label.labelId && 'active'}`}
            >
                <i>#</i>
                <span>{label.labelName}</span>
            </div>)}
        </div>
    </div>
}

export default Category