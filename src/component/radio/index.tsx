import { FC } from "react"

import { RadioItem } from "../../api/types"
import styles from './index.module.less'


interface RadioProps {
    data: RadioItem[]
    onChange?: (item: RadioItem) => void
}
const Radio: FC<RadioProps> = ({ data, onChange }) => {
    const radioName = 'SIGNATURE'

    return <div className={styles.radio_wrap}>
        {data.map(item => <div className={styles.radio_item} key={item.value}>
            <label>
                <span>{item.name}</span>
                <input
                    type="radio"
                    name={radioName}
                    onChange={() => onChange?.(item)}
                />
            </label>
        </div>)}
    </div>
}

export default Radio