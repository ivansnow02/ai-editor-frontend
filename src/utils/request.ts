// axios 封装
import axios from 'axios'
import { getToken, removeToken } from '@/utils/token'
import { router } from '@/router'
import { message } from 'ant-design-vue'
// 1.根域名配置
export const ROOT_URL = "http://127.0.0.1:8000";


const request = axios.create({
  baseURL: `${ROOT_URL}`,
  timeout: 50000
})



// !!因为添加了拦截器，所以只需要用request就可以了

// export const LoginRequest = axios.create({
//   baseURL: `${ROOT_URL}/api/register`
// })
// export const userRequest = axios.create({
//   baseURL: `${ROOT_URL}/api/user`,
//   timeout: 5000
// })
// export const AuthRequest = axios.create({
//   baseURL: `${ROOT_URL}/`,
//   timeout: 5000
// })


request.interceptors.request.use(
  (config) => {
    //1 获取token
    //2 按照后端要求拼接token
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 401 token过期
    if (error.response.status === 401) {
      removeToken()
      message.error('登录状态过期，请重新登录')
      router.push('/login').then(() => window.location.reload())
      return Promise.reject(error)
    }
  }
)


export { request }