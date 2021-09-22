import styles from './index.module.less'

const BiYing = () => {
    return <div className={styles.biying_wrap}>
        <div className={styles.biying_top}>
            <div className={styles.top_container}>
                <div className={styles.today}></div>
                <div className={styles.yesterday}></div>
            </div>
        </div>
        <div className={styles.biying_pics}>
            <div className={`${styles.pic_container} clearfix`}>
                <div className={styles.pic_item}>
                    <a href=""></a>
                </div>
                <div className={styles.pic_item}>
                    <a href=""></a>
                </div>
                <div className={styles.pic_item}>
                    <a href=""></a>
                </div>
                <div className={styles.pic_item}>
                    <a href=""></a>
                </div>
                <div className={styles.pic_item}>
                    <a href=""></a>
                </div>
                <div className={styles.pic_item}>
                    <a href=""></a>
                </div>
            </div>
        </div>
    </div>
}

export default BiYing