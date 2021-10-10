import React, { FC } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import hljs from 'highlight.js'
import 'react-markdown-editor-lite/lib/index.css'

import './index.module.less'

const md: MarkdownIt = new MarkdownIt({
    highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
            console.log('current language is: ' + lang, '\nand the content is: ', str, '\nthe compiled content is: ', hljs.highlight(str, { language: lang, ignoreIllegals: true }).value)
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
})

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
        const reader = new FileReader();
        reader.onload = (data: any) => {
            resolve(data.target.result);
        };
        reader.readAsDataURL(file);
    });
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
        renderHTML={(text) => md.render(text)}
        onChange={onChange}
    />
}

export default MarkdownEditor