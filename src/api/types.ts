export interface UserDTO {
    email: string
    username: string
    password: string
    verifyCode: string
}
export interface UserVO {
    userId: number
    username: string
    avatar: string
    email: string
    createTime: string
    updateTime: string
}
export interface LoginParams {
    email: string,
    password: string
}
export interface ArticlePage {
    labelId?: number
    categoryId?: number
    searchValue?: string
    sortColumn?: string
}
export interface Article {
    articleId: number
    articleName: string
    userId: number
    content: string
    cover: string
    linkAddress: string
    articleType: string
    categoryId: number
    viewCount: number
    like: number
    state: boolean
    createTime: string
    updateTime: string
}
export interface ArticleVO {
    articleId: number
    articleName: string
    user: UserVO
    content: string
    previewContent: string
    cover: string
    linkAddress: string
    articleType: string
    categoryId: number
    viewCount: number
    like: number
    createTime: string
    updateTime: string
}
export interface Category {
    categoryId: number
    categoryName: string
    iconClass: string
    show: boolean
    state: boolean
    updateTime: string
    createTime: string
}
export interface Label {
    labelId: number
    labelName: string
    iconClass: string
    state: boolean
    updateTime: string
    createTime: string
}