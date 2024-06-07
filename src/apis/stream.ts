import { request, aiRequest } from '@/utils/request';

export const getCompletion = (formData: any) => request({
    url: '/completion/invoke',
    method: 'POST',
    data: formData
})

export const streamAiGetCompletion = (FormData: string) => aiRequest({
    url: '/api/stream/completion',
    method: 'POST',
    data: {
        "prompt": FormData,
        "style": "string",
        "word_count": 0,
        "lang": "string"
      }
})

export const streamAiGetTranslation = (formData: string, lang: string = "English") => aiRequest({
    url: '/api/stream/translate',
    method: 'POST',
    data: {
        "prompt": formData,
        "style": "string",
        "word_count": 0,
        "lang": lang
    }
})
export const streamAiGetAbstraction = (formData: string, abs_count: number = 1) => aiRequest({
    url: '/api/stream/abstract',
    method: 'POST',
    data: {
        "prompt": formData,
        "style": "string",
        "word_count": abs_count,
        "lang": "string"
    }
})

export const streamAiGetPolish = (formData: string, style: string = "本文原本的") => aiRequest({
    url: '/api/stream/polish',
    method: 'POST',
    data: {
        "prompt": formData,
        "style": style,
        "word_count": 0,
        "lang": "string"
    }
})

export const streamAiGetFix= (formData: string) => aiRequest({
    url: '/api/stream/fix',
    method: 'POST',
    data: {
        "prompt": formData,
        "style": "string",
        "word_count": 0,
        "lang": "string"
      }
})