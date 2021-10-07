import { FC, ReactElement, useState } from "react"
import { useForm } from 'react-hook-form'
import styles from './index.module.less'
import { RegisterOptions } from "react-hook-form/dist/types/validator"
import {FieldError} from "react-hook-form/dist/types/errors";

interface Field {
    className?: string
    iconClassName?: string
    fieldName: string
    type: string
    placeholder: string
    keyword: string
    optional?: (fields: any) => RegisterOptions
    children?: ReactElement
}

const LOGIN_FIELDS: Field[] = [
    {
        className: styles.login_input,
        iconClassName: 'icon-youjianyouxiang',
        type: 'text',
        fieldName: 'email',
        placeholder: '请输入邮箱',
        keyword: '邮箱',
        optional: (fields?: any) => ({})
    },
    {
        className: styles.login_input,
        iconClassName: 'icon-lock1',
        fieldName: 'password',
        type: 'password',
        placeholder: '请输入密码',
        keyword: '密码',
        optional: (fields?: any) => ({})
    }
]
const REGISTER_FIELDS: Field[] = [
    {
        className: styles.login_input,
        iconClassName: 'icon-youjianyouxiang',
        type: 'text',
        fieldName: 'email',
        placeholder: '请输入邮箱',
        keyword: '邮箱',
        optional: (fields?: any) => ({
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            required: true
        })
    },
    {
        className: `${styles.login_input} ${styles.verify_code}`,
        iconClassName: 'icon-security',
        fieldName: 'verifyCode',
        type: 'text',
        placeholder: '请输入验证码',
        keyword: '验证码',
        optional: (fields?: any) => ({
            maxLength: 6,
            pattern: /^\d+$/,
            required: true
        }),
        children: <button>获取验证码</button>
    },
    {
        className: `${styles.login_input}`,
        fieldName: 'username',
        type: 'text',
        placeholder: '请输入用户昵称',
        keyword: '用户昵称',
        optional: (fields?: any) => ({ required: true }),
    },
    {
        className: styles.login_input,
        iconClassName: 'icon-lock1',
        type: 'password',
        fieldName: 'password',
        placeholder: '请输入密码',
        keyword: '密码',
        optional: (fields?: any) => ({ required: true })
    },
    {
        className: styles.login_input,
        iconClassName: 'icon-lock1',
        type: 'password',
        fieldName: 'confirmPassword',
        placeholder: '请输入确认密码',
        keyword: '确认密码',
        optional: (fields?: any) => ({
            required: true,
            validate: fields ? (value: any) => fields?.password === value : null
        })
    }
]

interface LoginProps {
    visible?: boolean
    setVisible?: (visible: boolean) => void
}
const Login: FC<LoginProps> = ({ visible, setVisible }) => {
    const [isLogin, setIsLogin] = useState(true)

    if (visible) {
        return <div className={styles.login_wrap}>
            <div className={styles.login_box}>
                <div className={`${styles.switch_modal} clearfix`}>
                    <div
                        className={`${styles.switch_item} ${isLogin && styles.active}`}
                        onClick={() => setIsLogin(true)}
                    >密码登录</div>
                    <div
                        className={`${styles.switch_item} ${!isLogin && styles.active}`}
                        onClick={() => setIsLogin(false)}
                    >新用户注册</div>
                    <i className='iconfont icon-cancel' onClick={() => setVisible?.(false)}/>
                </div>
                <div className={styles.modal}>
                {isLogin ? <LoginBox/> : <RegisterBox/>}
                </div>
            </div>
        </div>
    }
    return null
}

interface BlogInputProps {
    className?: string,
    inputProps?: { [key: string]: any},
    iconClassName?: string,
    error?: FieldError,
    children?: ReactElement
}
const BlogInput: FC<BlogInputProps> = ({
                                           className,
                                           inputProps,
                                           error,
                                           iconClassName,
                                           children
}) => {
    const errorTip = () => {
        return ''
    }

    return <div className={className}>
        <input {...inputProps}/>
        {iconClassName && <i className={`iconfont ${iconClassName}`}/>}
        <p className={styles.error_tip}>{errorTip()}</p>
        {children}
    </div>
}

const LoginBox = () => {
    return <>
        {LOGIN_FIELDS.map(({ className, type, placeholder, iconClassName, fieldName }) => <BlogInput
            key={fieldName}
            className={className}
            inputProps={{ type: type, placeholder: placeholder }}
            iconClassName={iconClassName}
        />)}
        <button>立即登录</button>
    </>
}

const RegisterBox = () => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm()
    const registerUser = (data: any) => {
        console.log('current user info: ', data, ', and errors is: ', errors)
    }
    console.log(errors)

    return <>
        {REGISTER_FIELDS.map(({ keyword, className, type, placeholder, iconClassName, optional = () => undefined, children, fieldName }) => <BlogInput
            key={fieldName}
            className={className}
            inputProps={{
                style: { borderColor: errors[fieldName] && '#f56c6c' },
                type: type,
                placeholder: placeholder,
                ...register(fieldName, optional(watch()))
            }}
            iconClassName={iconClassName}
            children={children}
        />)}
        <button onClick={handleSubmit(registerUser)}>立即注册</button>
    </>
}

export default Login