import { FC } from "react"

import { RadioItem } from "../../api/types"
import styles from './index.module.less'



interface RadioProps {
    selected?: string | number
    data: RadioItem[]
    onChange?: (item: RadioItem) => void
    formProps?: { [key:string]: any }
}
const Radio: FC<RadioProps> = ({ data, onChange, selected, formProps }) => {
    const radioName = 'SIGNATURE'

    return <div className={styles.radio_wrap}>
        {data.map(item => <div className={styles.radio_item} key={item.value}>
            <label>
                <span>{item.name}</span>
                <input
                    checked={item.value === selected}
                    type="radio"
                    value={item.value}
                    name={radioName}
                    onChange={() => onChange?.(item)}
                    {...formProps}
                />
            </label>
        </div>)}
    </div>
}

export default Radio