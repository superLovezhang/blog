import React, {FC, useContext, useEffect, useMemo} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import { renderRoutes, RouteConfig, matchRoutes } from 'react-router-config'

import Login from "../../component/login/index"
import ToTop from "@/component/toTop/index.tsx"
import Header from '@/component/header/index.tsx'
import WebSocketClient from "../../component/websocket"

import { useUserInfo } from "../../query/userQuery"
import { blogContext } from "../../store"
import styles from './index.module.less'


interface BaseLayoutProps {
    route : RouteConfig
}
const BaseLayout: FC<BaseLayoutProps> = ({ route }) => {
    const history = useHistory()
    const { dispatch } = useContext(blogContext)
    const { pathname } = useLocation()
    const { data: userData } = useUserInfo()
    const matchRoute = useMemo(() => matchRoutes(route.routes ?? [], pathname)[0], [route, pathname])

    useEffect(() => {
        history.listen((a, b) => {

        })
    }, [])
    useEffect(() => {
        if (pathname === '/login' && !!userData) {
            console.log(userData)
            if (!userData?.data) {
                dispatch({type: 'OPEN_LOGIN'})
            }
        }
        window.scrollTo({ top: 0 })
    }, [pathname, userData])

    return <div className={styles.base_layout_wrap}>
        <CommonComponent/>
        {matchRoute?.route?.needContainer ? <div className={styles.container}>
            {renderRoutes(route.routes)}
        </div> : renderRoutes(route.routes)}
    </div>
}

const CommonComponent = () => {
    return <>
        <Header/>
        <Login/>
        <ToTop/>
        <WebSocketClient/>
    </>
}

export default BaseLayout