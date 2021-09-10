import { FC } from "react"
import styles from './index.module.less'

interface EmptyProps {

}
const Empty: FC<EmptyProps> = () => {
    return <div className={styles.empty_wrap}>
        <div className={styles.empty_tip}>
            <i className="iconfont icon-xingqiu"></i>
            <div>暂无数据</div>
        </div>
    </div>
}

export default Empty