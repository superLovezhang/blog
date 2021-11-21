import { FC } from "react"
import Input from "../input"

interface PasswordProps {
    formProps?: { [key: string]: any }
    placeholder?: string
    value?: string
    onChange?: (value: any) => void
    disabled?: boolean
    iconClass?: string
    maxLength?: number
    style?: { [key: string]: string }
    ref?: any
}
const Password: FC<PasswordProps> = (props) => {
    return <Input
        {...props}
        formProps={{ type: "password", ...props?.formProps }}
    />
}

export default Password