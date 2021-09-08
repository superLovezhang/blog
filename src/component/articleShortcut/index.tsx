import { FC}  from "react"
import styles from './index.module.less'

interface ArticleShortcutProps {

}
const ArticleShortcut: FC<ArticleShortcutProps> = () => {
    return <div className={styles.article_shortcut_wrap}>articleShortcut...</div>
}

export default ArticleShortcut