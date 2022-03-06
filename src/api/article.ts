import request from '../util/request'
import { ArticleDTO, ArticlePage } from "./types"

/**
 * 获取文章列表
 * @param params
 */
export const articleList = (params?: ArticlePage) => request('/article/list', { params })
/**
 * 保存文章
 * @param data
 */
export const save = (data: Partial<ArticleDTO>) => request.post('/article/save', data)
/**
 * 获取文章详情
 * @param articleId
 */
export const detail = (articleId: string) => request('/article/' + articleId)
/**
 * 获取热门文章
 */
export const hotList = () => request('/article/hot')
/**
 * 确保有权限的获取文章详情
 * @param articleId
 */
export const ensurePermissionDetail = (articleId: string) => request('/article/ensurePermissionDetail', { params: { articleId: articleId} })
