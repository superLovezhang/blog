import { ChangeEvent, FC } from "react"
import { VerifyCodeButton } from "../login"
import styles from './index.module.less'

type InputType = 'INPUT' | 'VERIFY_CODE'
interface InputProps {
    placeholder?: string
    value?: string
    inputType?: InputType
    onChange?: (value: any) => void
    onEnter?: () => void
    onClick?: () => void
    disabled?: boolean
    iconClass?: string
    maxLength?: number
    style?: { [key: string]: string }
    ref?: any
    formProps?: { [key: string]: any }
}
const Input: FC<InputProps> = ({
                                   onChange,
                                   placeholder,
                                   iconClass,
                                   onEnter,
                                   onClick,
                                   maxLength,
                                   style,
                                   value,
                                   formProps,
                                   disabled,
                                   inputType,
}) => {
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }
    return <div className={`${styles.input_wrap} ${!iconClass && styles.no_icon} ${inputType === 'VERIFY_CODE' && styles.verify_code}`}>
        {iconClass && <i className={`iconfont ${iconClass}`}/>}
        <input
            {...formProps}
            onChange={changeInputValue}
            onKeyDown={(e) => e.keyCode === 13 && onEnter?.()}
            style={{ ...style, cursor: disabled ? 'not-allowed' : 'auto' }}
            value={value}
            onClick={() => onClick?.()}
            placeholder={placeholder ?? '请输入'}
            maxLength={maxLength ?? 16}
            disabled={disabled}
        />
        <VerifyCodeButton email={formProps?.verifySource} codeType={formProps?.codeType}/>
        {formProps?.error && <span className={styles.warn_tip}>校验不通过</span>}
    </div>
}

export default Input