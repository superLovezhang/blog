import {FC, forwardRef, useEffect, useState} from "react"
import moment from "moment"
import DatePicker, { registerLocale } from "react-datepicker"
import cn from 'date-fns/locale/zh-CN'
import "react-datepicker/dist/react-datepicker.css"
import Input from "../input"

registerLocale('cn', cn)
interface MyDatePickerProps {
    value?: string
    onChange?: (date?: string) => void
    formProps?: { [key: string]: any }
}
const MyDatePicker: FC<MyDatePickerProps> = ({ onChange, value, formProps }) => {
    const [startDate, setStartDate] = useState<any>(value && new Date(value))
    useEffect(() => { value && setStartDate(new Date(value)) }, [value])
    //@ts-ignore
    const CustomInput = forwardRef(({ value, onClick }, ref) => <Input
        {...formProps}
        placeholder={'请选择生日'}
        onClick={onClick}
        value={value}
        iconClass={'icon-calendar-alt'}
    />)

    return <DatePicker
        selected={startDate}
        locale="cn"
        dateFormat="yyyy-MM-dd"
        customInput={<CustomInput/>}
        isClearable
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={30}
        onChange={(v) => {
            //@ts-ignore
            onChange?.(v ? moment(v).format('yyyy-MM-DD') : undefined)
            setStartDate(v)
        }}
    />
}

export default MyDatePicker