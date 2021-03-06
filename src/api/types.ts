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
    page?: number
    size?: number
    sortColumn?: string
}
export interface UserDTO {
    email: string
    username: string
    password: string
    verifyCode: string
    gender: number
    birthday: string
    description: string
    city: string
    avatar: string
}
export interface UserVO {
    userId: string
    username: string
    avatar: string
    email: string
    gender: number
    birthday: string
    description: string
    city: string
    createTime: string
    updateTime: string
}
export interface UserPasswordDTO {
    verifyCode: string
    password: string
}
export interface LoginParams {
    email: string,
    password: string
}
export interface ArticlePage {
    labelId?: string
    categoryId?: string
    key?: number
    searchValue?: string
    sortColumn?: string
}
export interface Article {
    articleId: string
    articleName: string
    userId: number
    content: string
    htmlContent: string
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
export interface ArticleRecordVO {
    articleId: string
    articleName: string
}
export interface ArticleDTO {
    articleId: string
    articleName: string
    content: string
    htmlContent: string
    linkAddress: string
    articleType: string
    categoryId: number
    labelIds: string[]
}
export interface ArticleVO {
    articleId: string
    articleName: string
    user: UserVO
    content: string
    htmlContent: string
    previewContent: string
    cover: string
    linkAddress: string
    articleType: ArticleType
    category: CategoryVO
    labels: LabelVO[]
    commentCount: number
    viewCount: number
    likes: number
    collects: number
    collected: boolean
    liked: boolean
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
export interface CategoryVO {
    categoryId: string
    categoryName: string
    iconClass: string
    show: boolean
}
export interface Label {
    labelId: string
    labelName: string
    iconClass: string
    state: boolean
    updateTime: string
    createTime: string
}
export interface LabelVO {
    labelId: string
    labelName: string
    iconClass: string
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
    selfLike: boolean
    articleId: string
    createTime: string
    updateTime: string
}
export interface CommentTreeVO extends  CommentVO{
    children: CommentVO[]
}
export interface Img {
    base64URL: string
    url: string
}
export interface CommentPageDTO extends BasePageDTO {
    articleId?: string
}
export interface ArticleQueryParams {
    sortColumn?: 'createTime' | 'viewCount'
    categoryId?: string
    labelId?: string
    searchValue?: string
    page?: number
    size?: number
}
export interface CollectionVO {
    collectionId: string
    article: ArticleVO
    user: UserVO
}
export interface RadioItem {
    name: string
    value: string | number
}
export type ArticleType = 'ORIGINAL' | 'REPRINT' | 'TRANSLATE'
export interface PublishParameters {
    categoryId?: string
    labelIds?: string[]
    articleType?: ArticleType
    linkAddress?: string
}
export enum LikeType {
    ARTICLE = 'ARTICLE',
    COMMENT = 'COMMENT'
}
export interface WsMessageDTO {
    userId: string
    timestamp: number
    avatar: string
    message: string
    username: string
    messageType: 'MESSAGE' | 'INFO' | 'TIP' | 'SYNC'
}