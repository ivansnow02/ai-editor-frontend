import { imgRequest, ROOT_URL } from "../utils/request";

export const uploadImg = (formData: FormData) => {
    return imgRequest({
        url: '/upload',
        method: 'POST',
        data: formData
    })
}

export const getOCRResult = (img_path: string) => {
    const path = img_path.replace(`${ROOT_URL}/`, '')
    return imgRequest({
        url: `/ocr/?img_path=${encodeURIComponent(path)}`,
        method: 'GET',
    })
}