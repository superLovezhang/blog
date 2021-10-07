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
    day: number
} => {
    let date = new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }
}
interface Response {
    code: number
    message: string
    data: { [key: string]: any }
}
export const isSuccessful = (res: Partial<Response>) => res.code === 1000