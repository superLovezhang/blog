export const IMG_EXTENSIONS = ['.jpeg', '.tiff', '.png', '.gif', '.psd', '.svg', '.pdf', '.jpg']
export const DEFAULT_AVATAR = "https://tyzzblog.oss-cn-beijing.aliyuncs.com/2021/10/21/1634823510837image.png"
export const QUOTES = ["小楼昨夜又东风，故国不堪回首月明中。", "千里之行，始于足下。", "花有重开日，人物在少年。", "业精于勤荒于嬉，行成于思毁于随。", "吾尝终日而思矣，不如须臾之所学也。"]
export const WS_URL = process.env.NODE_ENV === 'production' ? "ws://www.tyzz.top:8000/message/websocket" : "ws://localhost:8000/message/websocket"