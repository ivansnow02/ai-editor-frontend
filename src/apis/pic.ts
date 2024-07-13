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
    url: '/api/img/ocr',
    data: {
      img_b64: img_path
    },
    method: 'POST'
  })
}
