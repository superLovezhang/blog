import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

export const className = (cssObject: { [key: string]: boolean } = {}) => {
    let cssString = ''
    for (let key in cssObject) {
        if (cssObject[key]) {
            cssString += key + ' '
        }
    }
    return cssString
}
export const getFileExtension = (fileName: string = '') => fileName.substring(fileName.lastIndexOf('.'))
export const objectIsNull = (object: null | undefined | object) => !object || JSON.stringify(object) === '{}'
export const currentMomentObj = (): {
    year: number,
    month: number,
    day: number,
    timestamp: number
} => {
    let date = new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        timestamp: date.getTime()
    }
}
export const isSuccessful = (res: any) => res?.code === 1000
export const MarkdownParser: MarkdownIt = new MarkdownIt({
    highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + MarkdownParser.utils.escapeHtml(str) + '</code></pre>';
    }
})
export const bingPicURL = (pic: any, size?: string) => `https://cn.bing.com/${pic?.urlbase}_${size || '480x800'}.jpg`
export const bingPicDownloadURL = (pic: any) => ({
    pc: `https://cn.bing.com/${pic?.urlbase}_1920x1080.jpg`,
    mobile: `https://cn.bing.com/${pic?.urlbase}_720x1280.jpg`,
    uhd: `https://cn.bing.com/${pic?.urlbase}_UHD.jpg`
})
export const bingDateFormat = (date: string) => `${date?.slice(0, 4)}-${date?.slice(4 ,6)}-${date?.slice(6)}`
export const bingInfo = (pic: any) => {
    const minimumIndex = Math.max(pic?.copyright.indexOf('，'), pic?.copyright.indexOf(','))
    return {
        title: pic?.copyright?.slice(0, minimumIndex),
        address: pic?.copyright?.slice(minimumIndex + 1),
        date: bingDateFormat(pic?.enddate),
        ...bingPicDownloadURL(pic)
    }
}
export const downloadImage = (imgsrc: string, name: string) => {//下载图片地址和图片名
    let image = new Image();
    image.setAttribute("crossOrigin", "anonymous")
    image.onload = function() {
        let canvas = document.createElement("canvas")
        canvas.width = image.width
        canvas.height = image.height
        let context = canvas.getContext("2d") as any
        context.drawImage(image, 0, 0, image.width, image.height)
        let url = canvas.toDataURL("image/png")
        let a = document.createElement("a")
        let event = new MouseEvent("click")
        a.download = name || "photo"
        a.href = url
        a.dispatchEvent(event)
    };
    image.src = imgsrc
}
/**
 * 获取当前聊天id 如果本地存储存在直接返回
 * 否则以当前时间戳生产id存储并返回
 */
export const chatId = () => {
    let chatId = window.localStorage.getItem("chatId")
    if (!chatId) {
        chatId = new Date().getTime() + ""
        window.localStorage.setItem("chatId", chatId)
    }
    return chatId
}