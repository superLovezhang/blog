import React, {FC, useEffect, useMemo, useState} from 'react'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import { MarkdownParser } from "../../util/util"
import { uploadFile } from '../../api/ossService'
import './index.module.less'
import MarkdownNavbar from "../markdonwNavbar";



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
                                                     value,
}) => {
    const onImageUpload = (file: File) => new Promise(resolve => {
        uploadFile(file)
            .then(url => resolve(url))
            .catch(err => {
                console.log(err)
                alert(err)
            })
    })
    const onChange = ({ text } : { text: string })=> setMdContent(text)
    useEffect(() => {
        if (!!value) {
            setHtmlContent?.(MarkdownParser.render(value))
        }
    }, [value])

    return <MdEditor
        style={style}
        shortcuts
        placeholder={placeholder}
        value={value}
        onImageUpload={onImageUpload}
        renderHTML={(text) => NavbarWrapper(MarkdownParser.render(text), value ?? '')}
        onChange={onChange}
    />
}

const NavbarWrapper = (html: string, mdContent: string) => {
    return <div style={{ position: 'relative'}}>
        <MarkdownNavbar source={mdContent} position={'right'}/>
        <div dangerouslySetInnerHTML={{__html: html}}/>
    </div>
}

export default MarkdownEditor