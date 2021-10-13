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
export const objectIsNull = (object: null | undefined | {} | object) => !object || JSON.stringify(object) === '{}'
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
interface Response {
    code: number
    message: string
    data: { [key: string]: any }
}
export const isSuccessful = (res: Partial<Response>) => res.code === 1000
export const MarkdownParser: MarkdownIt = new MarkdownIt({
    highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
            console.log('current language is: ' + lang, '\nand the content is: ', str, '\nthe compiled content is: ', hljs.highlight(str, { language: lang, ignoreIllegals: true }).value)
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + MarkdownParser.utils.escapeHtml(str) + '</code></pre>';
    }
})