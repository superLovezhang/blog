import { FC, useState } from "react"
import { useForm } from 'react-hook-form'
import styles from './index.module.less'

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

const LoginBox = () => {
    return <>
        <div className={styles.login_input}>
            <input type="text" placeholder='请输入邮箱'/>
            <i className={'iconfont icon-youjianyouxiang'}/>
        </div>
        <div className={styles.login_input}>
            <input type="password" placeholder='请输入密码'/>
            <i className={'iconfont icon-lock1'}/>
        </div>
        <button>立即登录</button>
    </>
}

const RegisterBox = () => {
    const { register, watch, formState: { errors } } = useForm()
    const registerUser = () => {
        console.log(watch())
    }

    return <>
        <div className={styles.login_input}>
            <input type="text" placeholder='请输入邮箱' {...register('email', { pattern: /$%#/ })}/>
            <i className={'iconfont icon-youjianyouxiang'}/>
        </div>
        <div className={`${styles.login_input} ${styles.verify_code}`}>
            <input type="text" placeholder='请输入验证码' {...register('verifyCode', { maxLength: 6, pattern: /\w/ })}/>
            <i className={'iconfont icon-security'}/>
            <button>获取验证码</button>
        </div>
        <div className={styles.login_input}>
            <input type="text" placeholder='请输入用户昵称'/>
        </div>
        <div className={styles.login_input}>
            <input type="text" placeholder='请输入密码'/>
            <i className={'iconfont icon-lock1'}/>
        </div>
        <div className={styles.login_input}>
            <input type="text" placeholder='请确认密码'/>
            <i className={'iconfont icon-lock1'}/>
        </div>
        <button>立即注册</button>
    </>
}

export default Login