import { useEffect, useMemo, useState, useContext } from "react"
import { NavLink, useHistory } from 'react-router-dom'

import { useUserInfo } from "../../query/userQuery"
import { blogContext } from "../../store"
import { useTheme } from "@/util/hook.ts"
import { className, objectIsNull } from '@/util/util.ts'
import { DEFAULT_AVATAR } from "../../util/constant"

import styles from './index.module.less'

const Header = () => {
    const { data, refetch } = useUserInfo()
    const { dispatch } = useContext(blogContext)
    const [searchValue, setSearchValue] = useState<string>('')
    const [dropDownVisible, setDropDownVisible] = useState(false)
    const history = useHistory()
    const [theme, toggleTheme, setStorageTheme] = useTheme()
    const themeSwitchClass = useMemo(() => className({
        'iconfont': true,
        'icon-sunny-sharp': theme === 'light',
        'icon-Moon': theme !== 'light'
    }), [theme])
    const user = data?.data
    const avatar = user?.avatar || DEFAULT_AVATAR

    const search = (e: any) => {
        if (e.keyCode === 13) {
            dispatch({ type: 'SEARCH_ARTICLE', payload: searchValue })
        }
    }
    const logout = () => {
        window.localStorage.removeItem('token')
        history.push('/')
        refetch()
    }
    useEffect(() => {
        setStorageTheme()
        // eslint-disable-next-line
    }, [])

    return <div className={styles.header}>
        <div className={styles.header_wrap}>
            <div className={styles.left_side}>
                <div className={styles.logo + ' cursor_pointer'} onClick={() => history.push('/')}>
                    <i className={`iconfont icon-code-box-fill ${styles.logo_icon}`}/>
                </div>
                <NavLink className={styles.left_side_item} to={'/'} exact>首页</NavLink>
                <NavLink className={styles.left_side_item} to={'/biying'}>每日必应</NavLink>
                <NavLink className={styles.left_side_item} to={'/messageBoard'}>随便说说</NavLink>
                <NavLink className={styles.left_side_item} to={'/api'}>公共Api</NavLink>
            </div>
            <div className={styles.right_side}>
                <div className={styles.search_input}>
                    <i className={`iconfont icon-fenxiang`}/>
                    <input
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={search}
                        type="text"
                        value={searchValue}
                        placeholder="搜索内容"
                        maxLength={32}
                    />
                </div>
                <div className={styles.setting_panel}>
                    <div
                        className={`${styles.switch_theme} ${styles.setting_button} cursor_pointer`}
                        onClick={toggleTheme}
                    >
                        <i className={themeSwitchClass}/>
                    </div>
                    <div
                        className={`${styles.publish_article} ${styles.setting_button} cursor_pointer`}
                        onClick={() => history.push('/publish')}
                    >
                        <i className={'iconfont icon-houtaiguanli-fabuwenzhang'}/>
                    </div>
                    {objectIsNull(user) ? <div
                        className={styles.login}
                        onClick={() => dispatch({ type: 'OPEN_LOGIN'})}
                    >登录/注册</div> : <div
                        className={styles.user_avatar + ' cursor_pointer'}
                        onMouseEnter={() => setDropDownVisible(true)}
                        onMouseLeave={() => setDropDownVisible(false)}
                    >
                        <img
                            className={styles.setting_button}
                            src={avatar}
                            alt={'头像'}
                        />
                        <div className={styles.username}>{user.username}</div>
                    </div>}
                </div>
            </div>
            {dropDownVisible && <div
                className={styles.drop_down_setting}
                onMouseEnter={() => setDropDownVisible(true)}
                onMouseLeave={() => setDropDownVisible(false)}
            >
                <div className={styles.arrow_top}>
                    <i className={'iconfont icon-caret-up'}/>
                </div>
                <div className={styles.setting_item + ' cursor_pointer'} onClick={() => history.push('/personalPage')}>
                    个人主页
                </div>
                <div className={styles.setting_item + ' cursor_pointer'} onClick={() => history.push('/setting')}>
                    个人设置
                </div>
                <div className={styles.setting_item + ' cursor_pointer'} onClick={logout}>
                    退出
                </div>
            </div>}
        </div>
    </div>
}

export default Header