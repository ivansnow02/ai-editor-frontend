import { request } from '@/utils/request'

export const authFunc = (formData: FormData, func: string) => {
  return request({
    url: `/${func}`,
    method: 'POST',
    data: formData
  })
}

// export const uploadImg = (formData: FormData) => {
//     return imgRequest({
//         url: '/upload',
//         method: 'POST',
//         data: formData
//     })
// }