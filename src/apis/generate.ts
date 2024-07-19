import { request } from '@/utils/request'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { getToken, removeToken } from '@/utils/token'
import { router } from '@/router';

export const getFileSummary = (formData: any) =>
  request({
    url: '/api/langserve/file_summary/invoke',
    method: 'POST',
    data: formData
  })

export const getFormatGen = (formData: any) =>
  request({
    url: '/api/langserve/format/invoke',
    method: 'POST',
    data: formData
  })

/**
 * 发送一个 POST 请求到指定的端点，并建立一个服务器发送事件连接以接收流数据。
 *
 * @param formData - 要发送到请求体中的数据。
 * @param func - 要附加到端点 URL 的功能名。
 * @param onMessage - 用于处理接收到的数据的回调函数。
 */
export const getStream = async (formData: any, func: string, onMessage: Function) => {
  await fetchEventSource(`https://kxj.ivansnow02.xyz/api/langserve/${func}/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(formData),
    onmessage: (event) => {
      if (event.event === 'data') {
        onMessage(JSON.parse(event.data).content)
      }
    },
    onerror: (error) => {
      // 关闭连接
      if (error.response.status === 401) {
        removeToken()
        router.push('/login').then(() => window.location.reload())
      }
    }
  })
}






