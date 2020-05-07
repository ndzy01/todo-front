import { message } from 'antd'
import axios from 'axios'
import config from '../config'

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? config.url : config.urlOnLine,
  timeout: 60000, // 请求超时时间
})

//添加一个响应拦截器
service.interceptors.response.use(
  function (response) {
    if (response.data.status === 500) {
      message.error('服务器出错了，请联系管理员！')
      return Promise.reject('服务器出错！')
    }
    return response
  },
  function (err) {
    message.error('网络错误！')
    return Promise.reject(err)
  }
)

export default service
