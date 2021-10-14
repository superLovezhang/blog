export interface Result {
    message: string
    code: number
    data: any
}
export interface PageResult extends Result {
    data: {
        records: any[]
        next: boolean
    }
}
export interface BasePageDTO {
    page: number
    size: number
    sortColumn: string
}
export interface UserDTO {
    email: string
    username: string
    password: string
    verifyCode: string
}
export interface UserVO {
    userId: string
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
    labelId?: string
    categoryId?: string
    searchValue?: string
    sortColumn?: string
}
export interface Article {
    articleId: string
    articleName: string
    userId: number
    content: string
    cover: string
    linkAddress: string
    articleType: string
    categoryId: number
    viewCount: number
    likes: number
    state: boolean
    createTime: string
    updateTime: string
}
export interface ArticleVO {
    articleId: string
    articleName: string
    user: UserVO
    content: string
    previewContent: string
    cover: string
    linkAddress: string
    articleType: string
    categoryId: number
    viewCount: number
    commentCount: number
    likes: number
    createTime: string
    updateTime: string
}
export interface Category {
    categoryId: string
    categoryName: string
    iconClass: string
    show: boolean
    state: boolean
    updateTime: string
    createTime: string
}
export interface Label {
    labelId: string
    labelName: string
    iconClass: string
    state: boolean
    updateTime: string
    createTime: string
}
export interface CommentDTO {
    content: string
    pics?: string
    parentId?: string
    replyId?: string
    articleId?: string
}
export interface CommentVO {
    commentId: string
    content: string
    pics: string[]
    user: UserVO
    replyComment: CommentVO
    likes: number
    articleId: string
    createTime: string
    updateTime: string
}
export interface CommentTreeVO {
    commentId: string
    content: string
    pics: string[]
    user: UserVO
    articleId: string
    children: CommentVO[]
    likes: number
    createTime: string
    updateTime: string
}
export interface Img {
    base64URL: string
    url: string
}
export interface CommentPageDTO extends BasePageDTO {
    articleId?: string
}