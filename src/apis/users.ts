import { request } from '@/utils/request'



export const getMe = async () => {
  return request({
    url: '/api/user/me',
    method: 'GET'
  })
}
// export const uploadImg = (formData: FormData) => {
//     return imgRequest({
//         url: '/upload',
//         method: 'POST',
//         data: formData
//     })
// }