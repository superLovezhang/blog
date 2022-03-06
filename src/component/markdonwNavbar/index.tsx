import React, {FC, useState} from "react"
import Navbar from 'markdown-navbar'

import styles from './index.module.less'
import 'markdown-navbar/dist/navbar.css'

interface MarkdownNavbarProps {
    source: string
}

const MarkdownNavbar: FC<MarkdownNavbarProps> = ({ source }) => {
    const [navVisible, setNavVisible] = useState(false)

    return <div className={styles.markdown_navbar_container + ` ${navVisible ? styles.show : styles.hide}`}>
            <div
                className={styles.toggle_btn}
                onClick={() => {
                    setNavVisible(!navVisible);
                }}
            >
                {navVisible ? "目录 →" : "← 目录"}
            </div>
        <Navbar
            className={styles.markdown_navbar}
            source={source}
            ordered={false}
        />
    </div>
}

export default MarkdownNavbar