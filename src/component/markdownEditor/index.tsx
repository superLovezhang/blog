import React, { FC } from 'react'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import { MarkdownParser } from "../../util/util"
import { uploadFile } from '../../api/ossService'
import './index.module.less'



interface MarkdownEditorProps {
    setMdContent: (content: string) => void
    setHtmlContent?: (content: string) => void
    style?: { [property: string]: string }
    placeholder?: string
    value?: string
}
const MarkdownEditor: FC<MarkdownEditorProps> = ({
                                                     style,
                                                     setMdContent,
                                                     setHtmlContent,
                                                     placeholder = '请输入内容',
                                                     value
}) => {
    const onImageUpload = (file: File) => new Promise(resolve => {
        uploadFile(file)
            .then(url => resolve(url))
            .catch(err => {
                console.log(err)
                alert(err)
            })
    })
    const onChange = ({ text, html }:  {
        text: string;
        html: string;
    }) => {
        setMdContent(text)
        setHtmlContent?.(html)
    }

    return <MdEditor
        style={style}
        shortcuts
        placeholder={placeholder}
        value={value}
        onImageUpload={onImageUpload}
        renderHTML={(text) => MarkdownParser.render(text)}
        onChange={onChange}
    />
}

export default MarkdownEditor