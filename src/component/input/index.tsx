import styles from './index.module.less'
import {ChangeEvent, FC, useEffect, useState} from "react"

interface InputProps {
    placeholder?: string
    value?: string
    onChange?: (value: any) => void
    onEnter?: () => void
    onClick?: () => void
    iconClass?: string
    maxLength?: number
    style?: { [key: string]: string }
    ref?: any
}
const Input: FC<InputProps> = ({
                                   onChange,
                                   placeholder,
                                   iconClass,
                                   onEnter,
                                   onClick,
                                   maxLength,
                                   style,
                                   value : externalValue
}) => {
    const [value, setValue] = useState(externalValue)
    useEffect(() => setValue(externalValue), [externalValue])

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
            onClick={() => onClick?.()}
            placeholder={placeholder ?? '请输入'}
            maxLength={maxLength ?? 16}
        />
    </div>
}

export default Input