import Category from "@/component/category/index.tsx"
import ArticleShortcut from "@/component/articleShortcut/index.tsx"

import styles from './index.module.less'

const Home = () => {
    return <div className={styles.home_wrap}>
        <Category/>
        <div className={styles.article_box}>
            <div className={styles.sort_top}>
                <span>最新</span>
                <span>最热</span>
                <i className={'iconfont icon-7xinxifabu'}></i>
            </div>
        </div>
        <ArticleShortcut/>
    </div>
}

export default Home