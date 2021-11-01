import styles from './index.module.less'

const Setting = () => {
    return <div className={styles.setting_wrap}>
        <div className={styles.setting_menu}>
            <div className={styles.menu_title}>
                <h2>设置</h2>
            </div>
            <div className={styles.menu_items}>
                <div className={styles.menu_item + ' active'}>
                    <i className="iconfont icon-gerenzhongxin"/>
                    <span>个人资料</span>
                </div>
                <div className={styles.menu_item}>
                    <i className="iconfont icon-shezhi-xianxing"/>
                    <span>账号设置</span>
                </div>
            </div>
        </div>
        <div className={styles.setting_content}>
            this is content
        </div>
    </div>
}

export default Setting