import React, { FC } from "react"
import Picker, { IEmojiData } from "emoji-picker-react"

const GROUP_NAME = {
    smileys_people: '表情',
    animals_nature: '动物',
    food_drink: '美食',
    travel_places: '旅游地点',
    activities: '活动',
    objects: '物品',
    symbols: '标识',
    flags: '旗帜',
    recently_used: '最近使用'
}

interface EmojiPickerProps {
    visible?: boolean
    callback: (data: IEmojiData) => void
}
const EmojiPicker: FC<EmojiPickerProps> = ({ visible, callback }) => {
    if (visible) {
        return  <div onClick={e => e.stopPropagation()}>
            <Picker
                groupNames={GROUP_NAME}
                disableSkinTonePicker
                preload
                disableSearchBar
                native
                onEmojiClick={(e, data) => callback(data)}
            />
        </div>
    }
    return null
}

export default EmojiPicker