import { FC, useEffect, useState } from "react"

import styles from '../index.module.less'

interface ChatIconProps {
    switchShape: () => void
}
const ChatIcon: FC<ChatIconProps> = ({ switchShape }) => {

    return <div className={styles.drag_icon} onClick={switchShape}>
        <i className="iconfont icon-chat"/>
    </div>
}

export default ChatIcon