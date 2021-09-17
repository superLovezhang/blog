import { FC } from "react"

import styles from "./index.module.less"

interface CommentListProps {

}
const CommentList: FC<CommentListProps> = () => {
    return <div className={styles.comment_list_wrap}>123</div>
}

export default CommentList