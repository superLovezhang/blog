import { FC } from "react"
import styles from './index.module.less'

const Category: FC = () => {
    return <div className={styles.category_wrap}>
        <div className={styles.category_top}>
            <h3>首页</h3>
        </div>
        <div className={`${styles.category_list} ${styles.list}`}>
            <div className={`${styles.category_item} ${styles.item}`}>
                <i className={'iconfont icon-biaoqiankuozhan_tuijian-126'}/>
                <span>推荐</span>
            </div>
            <div className={`${styles.category_item} ${styles.item}`}>
                <i className={'iconfont icon-zixunzhongxin'}/>
                <span>资讯</span>
            </div>
            <div className={`${styles.category_item} ${styles.item}`}>
                <i className={'iconfont icon-_qianduankaifa'}/>
                <span>前端</span>
            </div>
            <div className={`${styles.category_item} ${styles.item}`}>
                <i className={'iconfont icon-code'}/>
                <span>后端</span>
            </div>
            <div className={`${styles.category_item} ${styles.item}`}>
                <i className={'iconfont icon-dengpao'}/>
                <span>人生感悟</span>
            </div>
            <div className={`${styles.category_item} ${styles.item}`}>
                <i className={'iconfont icon-wodewenzhang'}/>
                <span>阅读</span>
            </div>
        </div>
        <div className={`${styles.tag_list} ${styles.list}`}>
            <div className={`${styles.tag_item} ${styles.item}`}>
                <i>#</i>
                <span>vue.js</span>
            </div>
            <div className={`${styles.tag_item} ${styles.item}`}>
                <i>#</i>
                <span>css</span>
            </div>
            <div className={`${styles.tag_item} ${styles.item}`}>
                <i>#</i>
                <span>html</span>
            </div>
            <div className={`${styles.tag_item} ${styles.item}`}>
                <i>#</i>
                <span>nodejs</span>
            </div>
            <div className={`${styles.tag_item} ${styles.item}`}>
                <i>#</i>
                <span>npm</span>
            </div>
            <div className={`${styles.tag_item} ${styles.item}`}>
                <i>#</i>
                <span>nginx</span>
            </div>
            <div className={`${styles.tag_item} ${styles.item}`}>
                <i>#</i>
                <span>vue2</span>
            </div>
            <div className={`${styles.tag_item} ${styles.item}`}>
                <i>#</i>
                <span>vue3</span>
            </div>
            <div className={`${styles.tag_item} ${styles.item}`}>
                <i>#</i>
                <span>javascript</span>
            </div>
        </div>
    </div>
}

export default Category