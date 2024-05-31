// axios 封装
import axios from 'axios'

// 1.根域名配置
// 2.超时时间
// 3.请求拦截

const request = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/langserve',
  timeout: 50000
})

export { request }