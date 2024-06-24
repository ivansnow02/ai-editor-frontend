import { request } from '@/utils/request'

export const createUser = (formData: FormData) => {
  return request({
    url: '/api/user/',
    method: 'POST',
    data: formData
  })
}

export const UserResult = (formData: FormData, Method: string) => {
  return request({
    url: '/api/user/me',
    method: Method,
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