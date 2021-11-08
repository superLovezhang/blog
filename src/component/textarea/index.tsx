import {ChangeEvent, FC, useState} from "react"

import styles from './index.module.less'

interface TextAreaProps {
    placeholder?: string
    maxLength?: number
    onChange?: (value: string) => void
}
const TextArea: FC<TextAreaProps> = ({ maxLength, placeholder, onChange }) => {
    const [textNum, setTextNum] = useState(0)
    const textareaTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let currentValue = e.target.value
        onChange?.(currentValue)
        setTextNum(currentValue.length)
    }

    return <div className={styles.textarea_wrap}>
        <textarea
            placeholder={placeholder ?? '请输入'}
            maxLength={maxLength ?? 300}
            onChange={textareaTextChange}
        />
        {!!maxLength && <span>{textNum}/{maxLength}</span>}
    </div>
}

export default TextArea