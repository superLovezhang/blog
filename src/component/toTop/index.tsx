import { useScroll } from '@/util/hook.ts'
import styles from './index.module.less'

const ToTop = () => {
    const visible = useScroll()
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    if (!visible) {
        return null
    }
    return <div
        className={styles.top}
        onClick={scrollToTop}
    >
        <i className='iconfont icon-top'></i>
    </div>
}

export default ToTop