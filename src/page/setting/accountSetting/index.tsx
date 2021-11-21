import { FC } from "react"
import { useForm } from "react-hook-form"
import Input from "../../../component/input"
import Password from "../../../component/password"
import { useUserPassword } from "../../../query/userQuery"

import styles from './index.module.less'

interface AccountSettingProps {
    email?: string
}
const AccountSetting: FC<AccountSettingProps> = ({ email }) => {
    const { register, handleSubmit, getValues, formState: { errors }, reset } = useForm()
    const { mutateAsync } = useUserPassword()
    const updatePwd = (params: any) => {
        mutateAsync({ password: params.password, verifyCode: params.verifyCode })
            .then(res => {
                alert('修改成功')
                reset()
            })
    }

    return <div className={styles.account_setting_wrap}>
        <p className={styles.account_title}>修改密码</p>
        <div className={styles.setting_item}>
            <Input
                placeholder={'请输入邮箱'}
                value={email}
                iconClass={'icon-youjianyouxiang'}
                disabled
            />
        </div>
        <div className={styles.setting_item}>
            <Input
                formProps={{
                    ...register('verifyCode', { required: true }),
                    error: errors['verifyCode'],
                    verifySource: email,
                    codeType: 1
                }}
                placeholder={'请输入验证码'}
                iconClass={'icon-security'}
                inputType={'VERIFY_CODE'}
            />
        </div>
        <div className={styles.setting_item}>
            <Password
                formProps={{
                    ...register('password', { required: true, pattern: /^[\d\w.]{9,16}$/ }),
                    error: errors['password']
                }}
                placeholder={'请输入密码'}
                iconClass={'icon-lock1'}
            />
        </div>
        <div className={styles.setting_item}>
            <Password
                formProps={{
                    ...register('confirmPassword', {
                        validate: (v) => getValues()?.password === v
                    }),
                    error: errors['confirmPassword']
                }}
                placeholder={'请再次输入密码'}
                iconClass={'icon-lock1'}
            />
        </div>
        <div className={styles.submit_button} onClick={handleSubmit(updatePwd)}>确认</div>
    </div>
}

export default AccountSetting