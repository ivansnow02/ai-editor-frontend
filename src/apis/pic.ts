import { request, ROOT_URL } from '../utils/request'

export const uploadImg = (formData: FormData) => {
  return request({
    url: '/api/img/upload',
    method: 'POST',
    data: formData
  })
}

export const getOCRResult = (img_path: string) => {
    const path = img_path.replace(`${ROOT_URL}/`, '')
  return request({
    url: `/api/img/ocr/?img_path=${encodeURIComponent(path)}`,
    method: 'GET'
  })
}