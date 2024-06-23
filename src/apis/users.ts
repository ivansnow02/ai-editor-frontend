import { userRequest } from "@/utils/request";

export const createUser= (formData: FormData) => {
    return userRequest({
        url: '/',
        method: 'POST',
        data: formData
    })
}

export const UserResult = (formData: FormData, Method: string) => {
    return userRequest({
        url: '/me',
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