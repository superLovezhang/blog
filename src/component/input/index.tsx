import styles from './index.module.less'
import {ChangeEvent, FC, useState} from "react";

interface InputProps {
    placeholder?: string
    onChange?: (value: any) => void
    onEnter?: () => void
    iconClass?: string
    maxLength?: number
    style?: { [key: string]: string }
}
const Input: FC<InputProps> = ({
                                   onChange,
                                   placeholder,
                                   iconClass,
                                   onEnter,
                                   maxLength,
                                   style
}) => {
    const [value, setValue] = useState('')
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        onChange?.(e.target.value)
    }
    return <div className={`${styles.input_wrap} ${!iconClass && styles.no_icon}`}>
        {iconClass && <i className={`iconfont ${iconClass}`}/>}
        <input
            onChange={changeInputValue}
            onKeyDown={(e) => e.keyCode === 13 && onEnter?.()}
            type="text"
            style={style}
            value={value}
            placeholder={placeholder ?? '请输入'}
            maxLength={maxLength ?? 16}
        />
    </div>
}

export default Input