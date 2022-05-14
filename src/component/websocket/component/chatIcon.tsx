import { FC, useEffect, useState } from "react"

import styles from '../index.module.less'

interface ChatIconProps {
    switchShape: () => void
    className: string
}
const ChatIcon: FC<ChatIconProps> = ({ switchShape, className }) => {

    return <div className={`${styles.drag_icon}`} onClick={switchShape}>
        <i className="iconfont icon-chat"/>
        <i style={{ display: 'none' }} className={`${className}`}/>
    </div>
}

export default ChatIcon