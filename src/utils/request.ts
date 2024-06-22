// axios 封装
import axios from 'axios';

// 1.根域名配置
export const ROOT_URL = "http://127.0.0.1:8000";
// 2.超时时间
// 3.请求拦截

const request = axios.create({
  baseURL: `${ROOT_URL}/api/langserve`,
  timeout: 50000
})

export { request }
const aiRequest = axios.create({
  baseURL: ROOT_URL,
  timeout: 50000
})

export { aiRequest };


export const imgRequest = axios.create({
  baseURL: `${ROOT_URL}/api/img`,
  timeout: 50000,
})
export const LoginRequest = axios.create({
  baseURL: `${ROOT_URL}/api/register`
})