import { request, aiRequest } from '@/utils/request'
import { fetchEventSource } from '@microsoft/fetch-event-source'

export const getCompletion = (formData: any) =>
  request({
    url: '/completion/invoke',
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
export const getStream = async (formData: Any, func: string, onMessage: Function) => {
  await fetchEventSource(`http://127.0.0.1:8000/api/langserve/${func}/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
    onmessage: (event) => {
      if (event.event === 'data') {
        onMessage(JSON.parse(event.data).content);
      }
    }
  })
}

export const aiGetCompletion = (formData: string) =>
  aiRequest({
    url: '/api/generate/completion',
    method: 'POST',
    data: {
      prompt: formData,
      style: 'string',
      word_count: 0,
      lang: 'string'
    }
  })
export const aiGetTranslation = (formData: string, lang: string = 'English') =>
  aiRequest({
    url: '/api/generate/translate',
    method: 'POST',
    data: {
      prompt: formData,
      style: 'string',
      word_count: 0,
      lang: lang
    }
  })
export const aiGetAbstraction = (formData: string, abs_count: number = 1) =>
  aiRequest({
    url: '/api/generate/abstract',
    method: 'POST',
    data: {
      prompt: formData,
      style: 'string',
      word_count: abs_count,
      lang: 'string'
    }
  })

export const aiGetPolish = (formData: string, style: string = '本文原本的') =>
  aiRequest({
    url: '/api/generate/polish',
    method: 'POST',
    data: {
      prompt: formData,
      style: style,
      word_count: 0,
      lang: 'string'
    }
  })

export const aiGetFix = (formData: string) =>
  aiRequest({
    url: '/api/generate/fix',
    method: 'POST',
    data: {
      prompt: formData,
      style: 'string',
      word_count: 0,
      lang: 'string'
    }
  })
