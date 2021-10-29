import React, { FC } from 'react'
import { PhotoConsumer, PhotoProvider } from "react-photo-view"
import 'react-photo-view/dist/index.css'

interface ImageViewProps {
    images: string[]
}
const ImageView: FC<ImageViewProps> = ({ images }) => {
    return <PhotoProvider>
        {images.map((item, index) => (
            <PhotoConsumer key={index} src={item} intro={item}>
                <img src={item} alt="" />
            </PhotoConsumer>
        ))}
    </PhotoProvider>
}

export default ImageView