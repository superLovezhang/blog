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

    useEffect(() => {
        setShape(false)
    }, [history.location])

    return <div className={styles.ws_container}>
        <Dialog shape={shape}/>
        <ChatIcon switchShape={() => setShape(!shape)}/>
    </div>
}

export default WebSocketClient