import {useState} from "react"
import { useHistory } from 'react-router-dom'

import Category from "@/component/category/index.tsx"
import ArticleShortcut from "@/component/articleShortcut/index.tsx"

import { className } from '@/util/util.ts'
import styles from './index.module.less'

const Home = () => {
    const history = useHistory()
    const [plainTextLayout, setPlainTextLayout] = useState(false)
    const articleItemClassName = className({
        [styles.article_summary]: true,
        [styles.article_card]: !plainTextLayout,
        [styles.article_text]: plainTextLayout
    })

    return <div className={styles.home_wrap}>
        <Category/>
        <div className={styles.article_box}>
            <div className={styles.sort_top}>
                <span className={'cursor_pointer active'}>最新</span>
                <span className={'cursor_pointer'}>最热</span>
                <div className={styles.layout_change} onClick={() => setPlainTextLayout(!plainTextLayout)}>
                    {!plainTextLayout ?
                        <i className={'iconfont icon-7xinxifabu cursor_pointer'}/> :
                        <i className={'iconfont icon-ic_format_align_justify_px cursor_pointer'}/>}
                </div>
            </div>
            <div className={styles.article_list}>
                {/*@ts-ignore*/}
                {[...new Array(5).keys()].map(index => <div
                    className={styles.article_item}
                    key={index}
                    onClick={() => history.push('/article/1')}
                >
                    <h3 className={styles.article_title}>字符串的新增方法</h3>
                    <div className={articleItemClassName}>
                        <div className={styles.summary_img}>
                            <img src="https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/images/2021/09/1631063241435.png?x-oss-process=image/resize,limit_0,m_fill,w_170,h_100/quality,q_100" alt=""/>
                        </div>
                        <div className={styles.summary_text}>
                            <span>uxt作为vue生态系统里最著名的后端渲染框架，在vue3正式发布已经大半年了还没有发布测试版，最近看到uxt的作
                            者们在Twitter上宣传uxt3即将发布。我已经迫不及待的找到了uxt3的m包，下载下来发现已经可以运行起
                            uxt作为vue生态系统里最著名的后端渲染框架，在vue3正式发布已经大半年了还没有发布测试版，最近看到uxt的作者们在Twitter上宣传uxt3即将发布。
                            我已经迫不及待的找到了uxt3的m包，下载下来发现已经可以运行起
                        </span>
                        </div>
                    </div>
                    <div className={styles.article_info}>
                        <div className={styles.info_item}>
                            <i className="iconfont icon-like-fill"></i>
                            <span>0 点赞</span>
                        </div>
                        <div className={styles.info_item}>
                            <i className="iconfont icon-comment_fill_light"></i>
                            <span>0 条留言</span>
                        </div>
                        <div className={styles.info_item}>
                            <i className="iconfont icon-yueduliang"></i>
                            <span>23 人阅读</span>
                        </div>
                        <div className={styles.info_item}>
                            <span>1天前</span>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
        <ArticleShortcut/>
    </div>
}

export default Home