import { FC, useEffect, useMemo, useRef, useState } from "react"

import { useUserInfo } from "../../../query/userQuery"
import { WsMessageDTO } from "../../../api/types"
import { DEFAULT_AVATAR, WS_URL } from "../../../util/constant"
import { chatId, className, objectIsNull } from "../../../util/util"
import Icon from '@/assets/icon.png'
import styles from '../index.module.less'


// const mock: WsMessageDTO[] = [
//     {
//         userId: '1231231231',
//         username: '用户1231231231',
//         timestamp: new Date().getTime(),
//         message: 'hello world',
//         avatar: DEFAULT_AVATAR,
//         messageType: 'MESSAGE'
//     },
//     {
//         userId: '',
//         username: '',
//         timestamp: new Date().getTime(),
//         message: '检测到您违法发言',
//         avatar: '',
//         messageType: 'TIP'
//     },
//     {
//         userId: '1442371251732303874',
//         username: '用户1231231231',
//         timestamp: new Date().getTime(),
//         message: 'hello world',
//         avatar: DEFAULT_AVATAR,
//         messageType: 'MESSAGE'
//     }
// ]
interface DialogProps {
    shape: boolean
    setNew: (i: boolean) => void
}
const Dialog: FC<DialogProps> = ({ shape, setNew }) => {
    const {data: userInfo} = useUserInfo()
    const [ws, setWS] = useState<null | WebSocket>()
    const [status, setStatus] = useState(false)
    const [onlineNum, setOnlineNum] = useState(0)
    const [chats, setChats] = useState<WsMessageDTO[]>([])
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>()
    const chatRef = useRef<HTMLDivElement>()


    const validateUserInfo = () => !!userInfo && !objectIsNull(userInfo.data)
    const userId = useMemo(() => validateUserInfo() ? userInfo.data.userId : chatId(), [userInfo])
    const username = useMemo(() => validateUserInfo() ? userInfo.data.username : chatId(), [userInfo])
    const buildHeaderElements = useMemo(() => {
        if (status) {
            return <p>
                <span>当前{onlineNum}人在线</span>
                <span className={`${styles.dot} ${styles.success}`}/>
            </p>
        } else {
            return <p>
                <span>连接服务器失败</span>
                <span className={`${styles.dot} ${styles.error}`}/>
            </p>
        }
    }, [status, onlineNum])
    const containerName = className({
        [styles.dialog]: true,
        [styles.expand]: shape,
        [styles.collapse]: !shape
    })
    /**
     * 自动聚焦输入框
     */
    const focusInput = () => {
        inputRef.current?.focus()
    }
    /**
     * 自动滚动到聊天窗口底部
     */
    const scrollToBottom = () => {
        chatRef.current?.scrollTo(0, chatRef.current?.scrollHeight)
    }
    /**
     * 装配一个消息实体类
     * @param message 发送内容
     */
    const assemblyMessage: (message: string) => WsMessageDTO = (message) => {
        let date = new Date()
        return {
            userId,
            username,
            timestamp: date.getTime(),
            message,
            avatar: validateUserInfo() ? userInfo.data.avatar : DEFAULT_AVATAR,
            messageType: 'MESSAGE'
        }
    }
    /**
     * 校验将要发送的消息
     */
    const validateSendMessage = () => {
        if (!inputValue) {
            alert("消息不能为空！")
            return false
        }
        if (inputValue.length > 150) {
            alert("消息内容不能超过150个字符！")
            return false
        }
        return true
    }
    /**
     * 向服务器发送消息
     */
    const sendMessage = () => {
        if (!validateSendMessage()) {
            return
        }
        ws?.send(JSON.stringify(assemblyMessage(inputValue)))
        setInputValue('')
    }
    /**
     * 连接后端websocket
     * 返回websocket连接
     */
    const connect = () => {
        let ws = new WebSocket(`${WS_URL}/${userId}/${username}`)
        setWS(ws)
        return ws
    }
    /**
     * 判断是否时自己发送的消息
     * @param id 用户id 匿名用户为时间戳
     */
    const isMe = (id: string) => {
        return userId === id
    }
    /**
     * 处理MESSAGE类型消息
     * @param message 服务端推送消息
     */
    const handleSync = (message: WsMessageDTO) => {
        let msg = JSON.parse(message.message) as WsMessageDTO[]
        chats.push(...msg)
        setChats([...chats])
        scrollToBottom()
    }
    /**
     * 处理MESSAGE类型消息
     * @param message 服务端推送消息
     */
    const handleMessage = (message: WsMessageDTO) => {
        chats.push(message)
        setChats([...chats])
        scrollToBottom()
    }
    /**
     * 处理INFO类型消息
     * @param message 服务端推送消息
     */
    const handleInfo = (message: WsMessageDTO) => {
        setOnlineNum(parseInt(message.message))
    }
    /**
     * 处理TIP类型消息
     * @param message 服务端推送消息
     */
    const handleTip = (message: WsMessageDTO) => {
        // as an adaptor for handleMessage
        handleMessage(message)
    }
    /**
     * 消息方法映射对象
     * 减少if分支 易于维护
     */
    const messageMapping = {
        MESSAGE: handleMessage,
        INFO: handleInfo,
        TIP: handleTip,
        SYNC: handleSync
    }
    /**
     * 给websocket添加消息监听器
     * @param ws websocket连接实例
     */
    const addMessageListener = (ws: WebSocket) => {
        ws.onmessage = (event) => {
            let message = JSON.parse(event.data ?? '{}') as WsMessageDTO
            // only the message isn't null!
            if (!objectIsNull(message)) {
                // 三种消息类型 分别处理
                messageMapping[message.messageType]?.(message);
            }
        }
    }
    /**
     * 添加连接关闭监听器
     * @param ws
     */
    const addCloseListener = (ws: WebSocket) => {
        ws.onclose = () => {
            setStatus(false)
        }
    }
    /**
     * 根据data动态渲染单挑消息样式
     * @param data {@link WsMessageDTO}
     * @param index 当前索引
     */
    const renderSingleMessage = (data: WsMessageDTO, index: number) => {
        const { messageType } = data
        if (messageType === 'MESSAGE') {
            return <div key={index} className={`${styles.dialog_message_item} 
                    ${isMe(data.userId) && styles.self_send}`}>
                <img src={data.avatar}/>
                <div className={styles.main_content}>
                    <i className={styles.username}>{data.username}</i>
                    <div className={styles.message}>{data.message}</div>
                </div>
            </div>
        } else if (messageType === 'TIP') {
            return <div key={index} className={`${styles.dialog_tip_item}`}>
                <i>{data.message}</i>
            </div>
        }
    }

    /**
     * 初始化启动的时候 自动连接后端websocket服务
     * 并添加消息监听
     */
    useEffect(() => {
        if (!!userInfo && ws == null) {
            let ws = connect()
            setStatus(true)
            addMessageListener(ws)
            addCloseListener(ws)
        }
    }, [userInfo])
    /**
     * 当对话框出现执行一些操作
     */
    useEffect(() => {
        if (shape) {
            // auto focus input element
            focusInput()
            // auto scroll the bottom of the chats container
            scrollToBottom()
            // clear message of input box
            setInputValue('')
            // clear unread flag
            setNew(false)
        }
    }, [shape])

    return <div className={containerName}>
        <div className={styles.dialog_header}>
            <div className={styles.logo}>
                <img src={Icon}/>
            </div>
            <div className={styles.msg}>
                <p>聊天室</p>
                {buildHeaderElements}
            </div>
        </div>
        <div className={styles.dialog_content}
             ref={e => e && (chatRef.current = e)}>
            {/*{mock.map(renderSingleMessage)}*/}
            {chats.map(renderSingleMessage)}
        </div>
        <div className={styles.dialog_commit}>
            <input type="text"
                   ref={(e) => e && (inputRef.current = e)}
                   value={inputValue}
                   onKeyDown={e => e.keyCode === 13 && sendMessage()}
                   onChange={(e) => setInputValue(e.target.value)}
            />
            <div className={styles.icon}
                 onClick={sendMessage}>
                <i className='iconfont icon-send'/>
            </div>
        </div>
    </div>
}

export default Dialog