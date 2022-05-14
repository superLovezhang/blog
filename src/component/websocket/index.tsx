import { FC, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import ChatIcon from "./component/chatIcon"
import Dialog from "./component/dialog"

import styles from './index.module.less'

interface WebSocketClientProps {
}
const WebSocketClient: FC<WebSocketClientProps> = ({}) => {
    const history = useHistory()
    const [shape, setShape] = useState(false)
    const [hasNew, setHasNew] = useState(true)

    useEffect(() => {
        setShape(false)
    }, [history.location])

    return <div className={styles.ws_container}>
        <Dialog shape={shape} setNew={setHasNew}/>
        <ChatIcon
            className={`${hasNew && styles.news}`}
            switchShape={() => setShape(!shape)}
        />
    </div>
}

export default WebSocketClient