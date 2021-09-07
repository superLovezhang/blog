import styles from './index.module.less'

const Header = () => {
    return <div className={styles.header}>
        <div className={styles.header_wrap}>
            <div className={styles.left_side}>
                <div className="logo">
                    <span className={`iconfont icon-code-box-fill ${styles.logo_icon}`}></span>
                </div>
                <div className={styles.left_side_items}>
                    <div className={styles.left_side_item}>首页</div>
                    <div className={styles.left_side_item}>每日必应</div>
                    <div className={styles.left_side_item}>随便说说</div>
                    <div className={styles.left_side_item}>公共Api</div>
                </div>
            </div>
            <div className={styles.right_side}>
                <div className={styles.search_input}>
                    <span className={`iconfont icon-fenxiang`}></span>
                    <input type="text" placeholder="搜索内容"/>
                </div>
                <div className={styles.setting_panel}>
                    <div className={styles.switch_theme_button}>
                        <span className={'iconfont icon-sunny-sharp'}></span>
                    </div>
                    <div className={styles.publish_article_button}>
                        <span className={'iconfont icon-houtaiguanli-fabuwenzhang'}></span>
                    </div>
                    <div className={styles.user_avatar}>
                        <img src="" alt=""/>
                    </div>
                    <div className={styles.username}>superLovezha</div>
                </div>
            </div>
        </div>
    </div>
}

export default Header