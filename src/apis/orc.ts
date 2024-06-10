import { request, aiRequest } from '@/utils/request'
import { fetchEventSource } from '@microsoft/fetch-event-source'

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
export const uploadimg = (formdata: file) => 
  aiRequest({
    url: '/api/orc/uploadimg',
    method: 'POST',
    data: formdata
})