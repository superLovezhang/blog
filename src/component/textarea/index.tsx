import {ChangeEvent, FC, useState} from "react"

import styles from './index.module.less'

interface TextAreaProps {
    value?: string
    placeholder?: string
    maxLength?: number
    onChange?: (value: string) => void
    formProps?: { [key: string]: any }
}
const TextArea: FC<TextAreaProps> = ({
                                         maxLength,
                                         placeholder,
                                         onChange,
                                         value,
                                         formProps
}) => {
    const [content, setContent] = useState(value ?? '')
    const [textNum, setTextNum] = useState(0)
    const textareaTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let currentContent = e.target.value ?? ''
        setContent(currentContent)
        onChange?.(currentContent)
        setTextNum(currentContent.length)
    }

    return <div className={styles.textarea_wrap}>
        <textarea
            {...formProps}
            value={content}
            placeholder={placeholder ?? '请输入'}
            maxLength={maxLength ?? 300}
            onChange={textareaTextChange}
        />
        {!!maxLength && <span>{textNum}/{maxLength}</span>}
    </div>
}

export default TextArea