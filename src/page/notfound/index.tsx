import { useHistory } from 'react-router-dom'

import NotFoundSvg from '@/assets/404_not_found.svg'
import styles from './index.module.less'

const NotFound = () => {
    const history = useHistory()

    return <div className={styles.error_page}>
        <div className={styles.error_page_container}>
            <div className={styles.error_page_text}>
                <h1 className={styles.error_page_title}>404</h1>
                <p className={styles.error_page_subtitle}>你似乎来到了没有知识存在的荒原</p>
                <a
                    className={`${styles.error_page_primary_button} ${styles.home_button}`}
                    href="/"
                >
                    去往首页
                </a>
                <div className={styles.error_page_other_button_container}>
                    或者
                    <button
                        onClick={() => history.go(-1)}
                        className={`${styles.error_page_other_button} ${styles.button}`}
                    >
                        返回上页
                        <svg
                            className="Zi Zi--ArrowRight"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            width="24px"
                            height="24px"
                        >
                            <path
                                d="M9.218 16.78a.737.737 0 0 0 1.052 0l4.512-4.249a.758.758 0 0 0 0-1.063L10.27 7.22a.737.737 0 0 0-1.052 0 .759.759 0 0 0-.001 1.063L13 12l-3.782 3.716a.758.758 0 0 0 0 1.063z"
                                fillRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={styles.error_page_error_image_container}>
                <img
                    className="error-page-errorImage"
                    src={NotFoundSvg}
                    alt="page error"
                />
            </div>
        </div>
    </div>
}

export default NotFound