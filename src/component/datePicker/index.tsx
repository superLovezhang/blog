import { FC, forwardRef, useState } from "react"
import moment from "moment"
import DatePicker, { registerLocale } from "react-datepicker"
import cn from 'date-fns/locale/zh-CN'
import "react-datepicker/dist/react-datepicker.css"
import Input from "../input"

registerLocale('cn', cn)
interface MyDatePickerProps {
    onChange?: (date?: string) => void
}
const MyDatePicker: FC<MyDatePickerProps> = ({ onChange }) => {
    const [startDate, setStartDate] = useState<any>()
    //@ts-ignore
    const CustomInput = forwardRef(({ value, onClick }, ref) => <Input
        placeholder={'请选择生日'}
        onClick={onClick}
        ref={ref}
        value={value}
        iconClass={'icon-calendar-alt'}
    />)

    return <DatePicker
        selected={startDate}
        locale="cn"
        dateFormat="yyyy-MM-dd"
        customInput={<CustomInput/>}
        isClearable={true}
        onChange={(v) => {
            //@ts-ignore
            onChange?.(v ? moment(v).format('yyyy-MM-DD') : undefined)
            setStartDate(v)
        }}
    />
}

export default MyDatePicker