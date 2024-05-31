import { request } from '@/utils/request';


export const getCompletion = (formData: any) => request({
    url: '/completion/invoke',
    method: 'POST',
    data: formData
})

