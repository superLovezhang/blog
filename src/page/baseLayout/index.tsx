import React, {FC, useMemo} from 'react'
import { useLocation } from 'react-router-dom'
import { renderRoutes, RouteConfig, matchRoutes } from 'react-router-config'

import ToTop from "@/component/toTop/index.tsx"
import Header from '@/component/header/index.tsx'

import styles from './index.module.less'

interface BaseLayoutProps {
    route : RouteConfig
}
const BaseLayout: FC<BaseLayoutProps> = ({ route }) => {
    const { pathname } = useLocation()
    const matchRoute = useMemo(() => matchRoutes(route.routes ?? [], pathname)[0], [route, pathname])

    return <div className={styles.base_layout_wrap}>
        <Header/>
        {matchRoute?.route?.needContainer ? <div className={styles.container}>
            {renderRoutes(route.routes)}
        </div> : renderRoutes(route.routes)}
        <ToTop/>
    </div>
}

export default BaseLayout