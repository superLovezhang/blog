import {FC, ReactElement, useContext, useEffect, useState} from "react"
import { useForm } from 'react-hook-form'
import { RegisterOptions } from "react-hook-form/dist/types/validator"
import { FieldError } from "react-hook-form/dist/types/errors"

import { useRegister, useLogin } from "../../query/userQuery"
import { blogContext } from "../../store"
import styles from './index.module.less'

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
        optional: (fields?: any) => ({
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            required: true
        })
    },
    {
        className: styles.login_input,
        iconClassName: 'icon-lock1',
        fieldName: 'password',
        type: 'password',
        placeholder: '请输入密码',
        keyword: '密码',
        optional: (fields?: any) => ({ required: true, pattern: /^[\d\w.]{9,16}$/ })
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
        optional: (fields?: any) => ({ required: true, pattern: /^[^\s]{6,16}$/ }),
    },
    {
        className: styles.login_input,
        iconClassName: 'icon-lock1',
        type: 'password',
        fieldName: 'password',
        placeholder: '请输入密码',
        keyword: '密码',
        optional: (fields?: any) => ({ required: true, pattern: /^[\d\w.]{9,16}$/ })
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
            pattern: /^[\d\w.]{9,16}$/,
            validate: fields ? (value: any) => fields?.password === value : null
        })
    }
]

interface LoginProps {
}
const Login: FC<LoginProps> = () => {
    const [isLogin, setIsLogin] = useState(true)
    const { state: { loginVisible }, dispatch } = useContext(blogContext)

    if (loginVisible) {
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
                    <i className='iconfont icon-cancel' onClick={() => dispatch({ type: 'CLOSE_LOGIN'})}/>
                </div>
                <div className={styles.modal}>
                {isLogin ? <LoginBox/> : <RegisterBox switchBox={() => setIsLogin(true)}/>}
                </div>
            </div>
        </div>
    }
    return null
}

interface BlogInputProps {
    keyword: string
    fieldName: string
    className?: string,
    inputProps?: { [key: string]: any},
    iconClassName?: string,
    errors?: { [key: string]: FieldError },
    children?: ReactElement,
}
const BlogInput: FC<BlogInputProps> = ({
                                           className,
                                           inputProps,
                                           errors,
                                           iconClassName,
                                           children,
                                           keyword,
                                           fieldName
}) => {
    const error = errors && errors[fieldName]
    const errorTipMap = {
        'required': '不能为空',
        'pattern': '格式错误',
        'maxLength': '长度错误',
        'validate': '校验不通过'
    }
    const errorTip = (error?: FieldError) => {
        //@ts-ignore
        const tip = errorTipMap[error?.type]
        return tip ? keyword + tip : ''
    }

    return <div className={className}>
        <input {...inputProps}/>
        {iconClassName && <i className={`iconfont ${iconClassName}`}/>}
        <p className={styles.error_tip}>{errorTip(error)}</p>
        {children}
    </div>
}

interface LoginBoxProps {
}
const LoginBox: FC<LoginBoxProps> = () => {
    const { mutate, isError, error } = useLogin()
    const { handleSubmit, register, watch, formState: { errors } } = useForm()

    useEffect(() => { isError && alert(error) }, [isError])
    const loginUser = async (params: any) => {
        mutate(params)
    }

    return <>
        {LOGIN_FIELDS.map(({
                               className,
                               type,
                               placeholder,
                               iconClassName,
                               fieldName,
                               keyword,
                               optional = () => undefined
        }) => <BlogInput
            key={fieldName}
            className={className}
            inputProps={{ type: type, placeholder: placeholder, ...register(fieldName, optional(watch())) }}
            iconClassName={iconClassName}
            errors={errors}
            fieldName={fieldName}
            keyword={keyword}
        />)}
        <button onClick={handleSubmit(loginUser)}>立即登录</button>
    </>
}

interface RegisterBoxProps {
    switchBox: () => void
}
const RegisterBox: FC<RegisterBoxProps> = ({ switchBox }) => {
    const { mutate, isSuccess, error } = useRegister()
    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm()
    const registerUser = (data: any) => {
        mutate(data)
        if (!isSuccess) {
            return alert(error)
        }
        reset()
        switchBox()
    }

    return <>
        {REGISTER_FIELDS.map(({
                                  keyword,
                                  className,
                                  type,
                                  placeholder,
                                  iconClassName,
                                  optional = () => undefined,
                                  children,
                                  fieldName
        }) => <BlogInput
            key={fieldName}
            className={className}
            inputProps={{
                style: { borderColor: errors[fieldName] && '#f56c6c' },
                type: type,
                placeholder: placeholder,
                ...register(fieldName, optional(watch()))
            }}
            keyword={keyword}
            errors={errors}
            fieldName={fieldName}
            iconClassName={iconClassName}
            children={children}
        />)}
        <button onClick={handleSubmit(registerUser)}>立即注册</button>
    </>
}

export default Login