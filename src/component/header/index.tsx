import styles from './index.module.less'

const Header = () => {
    return <div className={styles.header}>
        <div className={styles.header_wrap}>
            <div className={styles.left_side}>
                <div className={styles.logo + ' cursor_pointer'}>
                    <span className={`iconfont icon-code-box-fill ${styles.logo_icon}`}></span>
                </div>
                <div className={`${styles.left_side_item} active cursor_pointer`}>首页</div>
                <div className={styles.left_side_item + ' cursor_pointer'}>每日必应</div>
                <div className={styles.left_side_item + ' cursor_pointer'}>随便说说</div>
                <div className={styles.left_side_item + ' cursor_pointer'}>公共Api</div>
            </div>
            <div className={styles.right_side}>
                <div className={styles.search_input}>
                    <span className={`iconfont icon-fenxiang`}></span>
                    <input type="text" placeholder="搜索内容" maxLength={32}/>
                </div>
                <div className={styles.setting_panel}>
                    <div className={`${styles.switch_theme} ${styles.setting_button} cursor_pointer`}>
                        <span className={'iconfont icon-sunny-sharp'}></span>
                    </div>
                    <div className={`${styles.publish_article} ${styles.setting_button} cursor_pointer`}>
                        <span className={'iconfont icon-houtaiguanli-fabuwenzhang'}></span>
                    </div>
                    <div className={styles.user_avatar + ' cursor_pointer'}>
                        <img
                            className={styles.setting_button}
                            src="https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100"
                            alt=""
                        />
                        <div className={styles.username}>superLovezha</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Header