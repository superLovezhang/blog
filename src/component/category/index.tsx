import { FC, useEffect, useState } from "react"

import { categoryHot } from '../../api/category'
import { hot } from '../../api/label'
import { ArticlePage, Category as CategoryType, Label } from '../../api/types'

import styles from './index.module.less'

interface CategoryProps {
    changeQueryParams: (params: Partial<ArticlePage>) => void
}
const Category: FC<CategoryProps> = ({ changeQueryParams }) => {
    const [categories, setCategories] = useState([])
    const [labels, setLabels] = useState([])

    useEffect(() => {
        categoryHot()
            .then(({ data }) => {
                setCategories(data)
            })
        hot()
            .then(({ data }) => {
                setLabels(data)
            })
    }, [])

    return <div className={styles.category_wrap}>
        <div className={styles.category_top}>
            <h3>首页</h3>
        </div>
        <div className={`${styles.category_list} ${styles.list}`}>
            <div
                onClick={() => changeQueryParams({ labelId: undefined })}
                className={`${styles.category_item} ${styles.item}`}
            >
                <i className={'iconfont icon-biaoqiankuozhan_tuijian-126'}/>
                <span>推荐</span>
            </div>
            {categories.map((category: CategoryType) => <div
                key={category.categoryId}
                className={`${styles.category_item} ${styles.item}`}
                onClick={() => changeQueryParams({ categoryId: category.categoryId })}
            >
                <i className={`iconfont ${category.iconClass}`}/>
                <span>{category.categoryName}</span>
            </div>)}
        </div>
        <div className={`${styles.tag_list} ${styles.list}`}>
            {labels.map((label: Label) => <div
                onClick={() => changeQueryParams({ labelId: label.labelId })}
                className={`${styles.tag_item} ${styles.item}`}
            >
                <i>#</i>
                <span>{label.labelName}</span>
            </div>)}
        </div>
    </div>
}

export default Category