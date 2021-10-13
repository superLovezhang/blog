import OSS from 'ali-oss'
import request from '../util/request'
import { currentMomentObj } from "../util/util"

const ALIYUN_DOMAIN = 'zz--blog.oss-accelerate.aliyuncs.com'
export const credential = () => request('/oss/credential')
export const ossClient = () => new Promise((resolve, reject) => {
    credential()
        .then(({ data: { accessKeyId, accessKeySecret, securityToken }, message }) => {
            const client = new OSS({
                // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
                accessKeyId,
                accessKeySecret,
                // 从STS服务获取的安全令牌（SecurityToken）。
                stsToken: securityToken,
                // 填写Bucket所在地域。以华东1（杭州）为例，设置region为oss-cn-hangzhou。
                region: 'oss-cn-guangzhou',
                // 填写Bucket名称，例如examplebucket。
                bucket: 'zz--blog'
            })
            resolve(client)
        })
        .catch(e => reject(e))
})
export const uploadFile = (file) => {
   return new Promise((resolve, reject) => ossClient()
       .then(client => {
           let moment = currentMomentObj()
           const previewUrl = `https://${ALIYUN_DOMAIN}/${moment.year}/${moment.month}/${moment.day}/${moment.timestamp}${file.name}`
           client.put(`${moment.year}/${moment.month}/${moment.day}/${moment.timestamp}${file.name}`, file)
               .then(r => resolve(previewUrl))
               .catch(e => reject(e));
       })
       .catch(e => reject(e)))
}