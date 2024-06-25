import { request } from '../utils/request'

export const uploadImg = (formData: FormData) => {
  return request({
    url: '/api/img/upload',
    method: 'POST',
    data: formData
  })
}

export const getOCRResult = (img_path: string) => {
  return request({
    url: `/api/img/ocr/?img_path=${encodeURIComponent(img_path)}`,
    method: 'GET'
  })
}

export const getImg = (pk: string) => {
  return request({
    url: `/api/img/${pk}`,
    method: 'GET'
  })
}