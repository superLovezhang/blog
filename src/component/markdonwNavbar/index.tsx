import React, { FC, useState } from "react"
// @ts-ignore
import Navbar from '../Navbar'

import styles from './index.module.less'

interface MarkdownNavbarProps {
    source: string
    position?: 'left' | 'right'
}

const MarkdownNavbar: FC<MarkdownNavbarProps> = ({ source, position = 'left' }) => {
    const [navVisible, setNavVisible] = useState(false)

    return <div
        className={styles.markdown_navbar_container +
        ` ${navVisible ? styles.show : styles.hide}` +
        ` ${position === 'left' ? styles.left : styles.right}`
        }
    >
        <div
            className={styles.toggle_btn}
            onClick={() => {
                setNavVisible(!navVisible);
            }}
        >目录</div>
        <Navbar
            className={styles.markdown_navbar}
            source={source}
            ordered={false}
        />
    </div>
}

export default MarkdownNavbar