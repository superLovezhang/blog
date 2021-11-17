import { createRef, useEffect } from "react"
import { useForm } from 'react-hook-form'

import Input from "../../component/input"
import Radio from "../../component/radio"
import TextArea from "../../component/textarea"
import MyDatePicker from "../../component/datePicker"
import { useSaveUser, useUserInfo } from "../../query/userQuery"

import { isSuccessful } from "../../util/util"
import { UserVO } from "../../api/types"
import styles from './index.module.less'
import {uploadFile} from "../../api/ossService";

const Setting = () => {
    const avatarRef = createRef<HTMLInputElement>()
    const { register, getValues, handleSubmit, watch, setValue, formState: { errors } }  = useForm()
    const { mutateAsync } = useSaveUser()
    const { data: userData } = useUserInfo()
    const userInfo = (userData?.data ?? {}) as Partial<UserVO>
    const genderData = [{ name: '男', value: 0 }, { name: '女', value: 1 }, { name: '保密', value: 3 }]

    useEffect(() => {
        setValue('avatar', userInfo.avatar)
        setValue('username', userInfo.username)
        setValue('gender', userInfo.gender)
        setValue('birthday', userInfo.birthday)
        setValue('city', userInfo.city)
        setValue('description', userInfo.description)
        watch()
    }, [userInfo])

    const modifyUserInfo = (data: any) => {
        console.log(data)
        mutateAsync(data)
            .then(res => {
                if (isSuccessful(res)) {

                }
            })
    }

    return <div className={styles.setting_wrap}>
        <div className={styles.setting_menu}>
            <div className={styles.menu_title}>
                <h2>设置</h2>
            </div>
            <div className={styles.menu_items}>
                <div className={styles.menu_item + ' active'}>
                    <i className="iconfont icon-gerenzhongxin"/>
                    <span>个人资料</span>
                </div>
                <div className={styles.menu_item}>
                    <i className="iconfont icon-shezhi-xianxing"/>
                    <span>账号设置</span>
                </div>
            </div>
        </div>
        <div className={styles.setting_content}>
            <div className={styles.setting_box}>
                <div className={styles.setting_item}>
                    <div className={styles.left_label}>头像:</div>
                    <div className={styles.right_content}>
                        <div className={styles.avatar} onClick={() => avatarRef?.current?.click?.()}>
                            <img src={getValues()?.avatar} alt=""/>
                            <div className={styles.mask}>
                                <i className="iconfont icon-camera"/>
                            </div>
                        </div>
                        <input
                            ref={avatarRef}
                            type="file"
                            onChange={async (e) => setValue('avatar', await uploadFile(e?.target?.files?.[0]))}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <div className={styles.setting_item}>
                    <div className={styles.left_label}>用户名:</div>
                    <div className={styles.right_content}>
                        <Input formProps={{ ...register('username', { required: true }), error: errors['username'] }}/>
                    </div>
                </div>
                <div className={styles.setting_item}>
                    <div className={styles.left_label}>性别:</div>
                    <div className={styles.right_content}>
                        <Radio
                            selected={getValues()?.gender}
                            data={genderData}
                            formProps={{ ...register('gender')}}
                        />
                    </div>
                </div>
                <div className={styles.setting_item}>
                    <div className={styles.left_label}>生日:</div>
                    <div className={styles.right_content}>
                        <MyDatePicker
                            value={userInfo.birthday}
                            onChange={v => setValue('birthday', v)}
                        />
                    </div>
                </div>
                <div className={styles.setting_item}>
                    <div className={styles.left_label}>现居城市:</div>
                    <div className={styles.right_content}>
                        <Input
                            maxLength={30}
                            formProps={{ ...register('city')}}
                        />
                    </div>
                </div>
                <div className={styles.setting_item}>
                    <div className={styles.left_label}>个性签名:</div>
                    <div className={styles.right_content}>
                        <TextArea
                            maxLength={300}
                            formProps={{ ...register('description')}}
                        />
                    </div>
                </div>
                <div className={styles.submit_button} onClick={handleSubmit(modifyUserInfo)}>确认</div>
            </div>
        </div>
    </div>
}

export default Setting