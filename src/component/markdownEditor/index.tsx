import React, { FC } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import './index.module.less'

const mdParser = new MarkdownIt()

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
    // const onImageUpload = (file: File) => {}
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
        renderHTML={(text) => mdParser.render(text)}
        onChange={onChange}
    />
}

export default MarkdownEditor