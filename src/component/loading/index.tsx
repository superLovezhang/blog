import styles from './index.module.less'

const Loading = () => {
    return <div className={styles.spinner}>
        <div className={`${styles['spinner-container']} ${styles.container1}`}>
            <div className={styles.circle1}/>
            <div className={styles.circle2}/>
            <div className={styles.circle3}/>
            <div className={styles.circle4}/>
        </div>
        <div className={`${styles['spinner-container']} ${styles.container2}`}>
            <div className={styles.circle1}/>
            <div className={styles.circle2}/>
            <div className={styles.circle3}/>
            <div className={styles.circle4}/>
        </div>
        <div className={`${styles['spinner-container']} ${styles.container3}`}>
            <div className={styles.circle1}/>
            <div className={styles.circle2}/>
            <div className={styles.circle3}/>
            <div className={styles.circle4}/>
        </div>
    </div>
}

export default Loading