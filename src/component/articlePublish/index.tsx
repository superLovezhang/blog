import styles from "./index.module.less";
import {FC} from "react";

const categories = []
const labels = []
interface ArticlePublishProps {
    style?: { [property: string]: string}
}
const ArticlePublish: FC<ArticlePublishProps> = ({ style }) => {
    return <div className={styles.publish_option} style={style}>
        <div className={styles.category}>
            <div className={styles.category_title}>分类</div>
            <div className={styles.category_list}>
                <div className={styles.category_item}>资讯</div>
                <div className={styles.category_item}>前端</div>
                <div className={styles.category_item}>后端</div>
            </div>
        </div>
        <div className={styles.label}>
            <div className={styles.label_title}>添加标签</div>
            <div className={styles.label_list}>
                <div className={styles.label_item}>vue</div>
                <div className={styles.label_item}>react</div>
                <div className={styles.label_item}>react</div>
                <div className={styles.label_item}>react</div>
                <div className={styles.label_item}>react</div>
                <div className={styles.label_item}>react</div>
                <div className={styles.label_item}>react</div>
                <div className={styles.label_item}>react</div>
            </div>
        </div>
        <div className={styles.type}>
            <input type="radio" name="type"/>
            <label>原创</label>
            <input type="radio" name="type"/>
            <label>转载</label>
            <input type="radio" name="type"/>
            <label>翻译</label>
        </div>
        <div className={styles.link}>
            <input type="text" placeholder={'请输入原文链接'}/>
        </div>
        <div className={styles.confirm_button}>
            <i className="iconfont"></i>
            <span>确认并发布</span>
        </div>
    </div>
}

export default ArticlePublish