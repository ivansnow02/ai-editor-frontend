import { request, aiRequest } from '@/utils/request';


export const getCompletion = (formData: any) => request({
    url: '/completion/invoke',
    method: 'POST',
    data: formData
})

export const aiGetCompletion = (formData: string) => aiRequest({
    url: '/api/generate/completion',
    method: 'POST',
    data: {
        "prompt": formData,
        "style": "string",
        "word_count": 0,
        "lang": "string"
      }
})
export const aiGetTranslation = (formData: string, lang: string = "English") => aiRequest({
    url: '/api/generate/translate',
    method: 'POST',
    data: {
        "prompt": formData,
        "style": "string",
        "word_count": 0,
        "lang": lang
    }
})
export const aiGetAbstraction = (formData: string, abs_count: number = 1) => aiRequest({
    url: '/api/generate/abstract',
    method: 'POST',
    data: {
        "prompt": formData,
        "style": "string",
        "word_count": abs_count,
        "lang": "string"
    }
})

export const aiGetPolish = (formData: string, style: string = "本文原本的") => aiRequest({
    url: '/api/generate/polish',
    method: 'POST',
    data: {
        "prompt": formData,
        "style": style,
        "word_count": 0,
        "lang": "string"
    }
})

export const aiGetFix= (formData: string) => aiRequest({
    url: '/api/generate/fix',
    method: 'POST',
    data: {
        "prompt": formData,
        "style": "string",
        "word_count": 0,
        "lang": "string"
      }
})
