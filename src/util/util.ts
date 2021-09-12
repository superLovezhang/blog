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