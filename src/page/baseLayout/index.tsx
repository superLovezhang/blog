import React, { FC } from 'react'
import { renderRoutes, RouteConfig } from 'react-router-config'

import Header from '@/component/header/index.tsx'

import styles from './index.module.less'

interface BaseLayoutProps {
    route : RouteConfig
}
const BaseLayout: FC<BaseLayoutProps> = ({ route }) => {
    return <div className={styles.base_layout_wrap}>
        <Header/>
        <div className={styles.container}>
            {renderRoutes(route.routes)}
        </div>
    </div>
}

export default BaseLayout