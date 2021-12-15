import React, {FC, useContext, useEffect, useMemo} from 'react'
import { useLocation } from 'react-router-dom'
import { renderRoutes, RouteConfig, matchRoutes } from 'react-router-config'

import Login from "../../component/login/index"
import ToTop from "@/component/toTop/index.tsx"
import Header from '@/component/header/index.tsx'

import styles from './index.module.less'
import {blogContext} from "../../store";

interface BaseLayoutProps {
    route : RouteConfig
}
const BaseLayout: FC<BaseLayoutProps> = ({ route }) => {
    const { dispatch } = useContext(blogContext)
    const { pathname } = useLocation()
    const matchRoute = useMemo(() => matchRoutes(route.routes ?? [], pathname)[0], [route, pathname])
    useEffect(() => {
        if (pathname === '/login') {
            dispatch({ type: 'OPEN_LOGIN'})
        }
        window.scrollTo({ top: 0 })
    }, [pathname])

    return <div className={styles.base_layout_wrap}>
        <Header/>
        <Login/>
        {matchRoute?.route?.needContainer ? <div className={styles.container}>
            {renderRoutes(route.routes)}
        </div> : renderRoutes(route.routes)}
        <ToTop/>
    </div>
}

export default BaseLayout