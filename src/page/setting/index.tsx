import { useState } from "react"

import PersonalSetting from './personalSetting/index'
import AccountSetting from './accountSetting/index'

import styles from './index.module.less'

type MenuType = 'Personal' | 'Account'
type MenuItem = {
    name: string,
    type: MenuType,
    icon: string
}
const SETTING_MENUS: MenuItem[] = [
    {
        name: '个人资料',
        type: 'Personal',
        icon: 'icon-gerenzhongxin'
    },
    {
        name: '账号设置',
        type: 'Account',
        icon: 'icon-shezhi-xianxing'
    }
]
const Setting = () => {
    const [settingType, setSettingType] = useState<MenuType>('Personal')

    return <div className={styles.setting_wrap}>
        <div className={styles.setting_menu}>
            <div className={styles.menu_title}>
                <h2>设置</h2>
            </div>
            <div className={styles.menu_items}>
                {SETTING_MENUS.map(menu => <div
                    className={`${styles.menu_item} ${menu.type === settingType && 'active'}`}
                    key={menu.name}
                    onClick={() => setSettingType(menu.type)}
                >
                    <i className={`iconfont ${menu.icon}`}/>
                    <span>{menu.name}</span>
                </div>)}
            </div>
        </div>
        <div className={styles.setting_content}>
            {settingType === 'Personal' ? <PersonalSetting/> : <AccountSetting/>}
        </div>
    </div>
}

export default Setting