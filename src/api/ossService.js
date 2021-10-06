import OSS from 'ali-oss'
import request from '../util/request'
import { currentMomentObj } from "../util/util"

export const credential = () => request('/open/oss/credential')

export const ossClient = () => new Promise((resolve, reject) => {
    credential()
        .then(result => {
            const client = new OSS({
                // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
                accessKeyId: result.accessKeyId,
                accessKeySecret: result.accessKeySecret,
                // 从STS服务获取的安全令牌（SecurityToken）。
                stsToken: result.securityToken,
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
           // 生成签名URL。
           // 填写Object完整路径，例如ossdemo.txt。Object完整路径中不能包含Bucket名称。
           let moment = currentMomentObj()
           const url = client.signatureUrl(`${moment.year}/${moment.month}/${moment.day}/${file.filename}`)
           console.log(url);
           client.put(url, file)
               .then(r => resolve(url))
               .catch(e => reject(e));
       })
       .catch(e => reject(e)))
}