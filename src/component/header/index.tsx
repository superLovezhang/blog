import {useEffect, useMemo, useState} from "react"

import { useTheme } from "@/util/hook.ts"
import { className } from '@/util/util.ts'

import styles from './index.module.less'

const Header = () => {
    const [dropDownVisible, setDropDownVisible] = useState(false)
    const [theme, toggleTheme, setStorageTheme] = useTheme()
    const themeSwitchClass = useMemo(() => className({
        'iconfont': true,
        'icon-sunny-sharp': theme === 'light',
        'icon-Moon': theme !== 'light'
    }), [theme])

    useEffect(() => {
        setStorageTheme()
        // eslint-disable-next-line
    }, [])

    return <div className={styles.header}>
        <div className={styles.header_wrap}>
            <div className={styles.left_side}>
                <div className={styles.logo + ' cursor_pointer'}>
                    <i className={`iconfont icon-code-box-fill ${styles.logo_icon}`}></i>
                </div>
                <div className={`${styles.left_side_item} active cursor_pointer`}>首页</div>
                <div className={styles.left_side_item + ' cursor_pointer'}>每日必应</div>
                <div className={styles.left_side_item + ' cursor_pointer'}>随便说说</div>
                <div className={styles.left_side_item + ' cursor_pointer'}>公共Api</div>
            </div>
            <div className={styles.right_side}>
                <div className={styles.search_input}>
                    <i className={`iconfont icon-fenxiang`}></i>
                    <input type="text" placeholder="搜索内容" maxLength={32}/>
                </div>
                <div className={styles.setting_panel}>
                    <div
                        className={`${styles.switch_theme} ${styles.setting_button} cursor_pointer`}
                        onClick={toggleTheme}
                    >
                        <i className={themeSwitchClass}></i>
                    </div>
                    <div className={`${styles.publish_article} ${styles.setting_button} cursor_pointer`}>
                        <i className={'iconfont icon-houtaiguanli-fabuwenzhang'}></i>
                    </div>
                    <div
                        className={styles.user_avatar + ' cursor_pointer'}
                        onMouseEnter={() => setDropDownVisible(true)}
                        onMouseLeave={() => setDropDownVisible(false)}
                    >
                        <img
                            className={styles.setting_button}
                            src="https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100"
                            alt=""
                        />
                        <div className={styles.username}>superLovezha</div>
                    </div>
                </div>
            </div>
            {dropDownVisible && <div
                className={styles.drop_down_setting}
                onMouseEnter={() => setDropDownVisible(true)}
                onMouseLeave={() => setDropDownVisible(false)}
            >
                <i className={'iconfont icon-caret-up'}></i>
                <div className={styles.setting_item + ' cursor_pointer'}>
                    个人主页
                </div>
                <div className={styles.setting_item + ' cursor_pointer'}>
                    个人设置
                </div>
                <div className={styles.setting_item + ' cursor_pointer'}>
                    退出
                </div>
            </div>}
        </div>
    </div>
}

export default Header