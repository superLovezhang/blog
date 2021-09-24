import { FC } from "react"
import LazyLoad from "react-lazyload"

import Loading from '@/component/loading/index.tsx'

interface LazyImgProps {
    url: string
}
const LazyImg: FC<LazyImgProps> = ({ url }) => {
    return <LazyLoad
        placeholder={<Loading/>}
        style={{ height: '100%' }}
        once
    >
        <img src={url} alt=""/>
    </LazyLoad>
}

export default LazyImg