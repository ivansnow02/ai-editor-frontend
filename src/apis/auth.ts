import { request } from '@/utils/request'

export const authFunc = (username: string, password: string, func: string) => {
  const data = new URLSearchParams()
  data.append('grant_type', '')
  data.append('username', username)
  data.append('password', password)
  data.append('scope', '')
  data.append('client_id', '')
  data.append('client_secret', '')

  return request({
    url: `/${func}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data.toString()
  })
}

export const sendCode = (email: string) => {
  return request({
    url: '/send_code',
    method: 'POST',
    data: { 
      email: email,
      code: ''
    }
  })
}

export const resetPassword = (email: string, password: string, code: string) => {
  return request({
    url: '/reset_password',
    method: 'PATCH',
    data: {
      obj_in: {
        email: email,
        password: password
      },
      email_code: {
        email: email,
        code: code
      }
    }
  })
} 

export const checkUser = (username: string) => {
  return request({
    url: `/user/${username}`,
    method: 'GET',
  })
}

// {
//   "obj_in": {
//     "username": "string",
//     "email": "string",
//     "access": 0,
//     "avatar": "string",
//     "password": "string"
//   },
//   "email_code": {
//     "email": "string",
//     "code": "string"
//   }
// }

export const register = (username: string, email: string, password: string, code: string) => {
  return request({
    url: '/register',
    method: 'POST',
    data: {
      obj_in: {
        username: username,
        email: email,
        access: 0,
        avatar: '',
        password: password
      },
      email_code: {
        email: email,
        code: code
      }
    }
  })
}

export const checkMail = (email: string) => {
  return request({
    url: `/email/${email}`,
    method: 'GET',
  })
}


// export const uploadImg = (formData: FormData) => {
//     return imgRequest({
//         url: '/upload',
//         method: 'POST',
//         data: formData
//     })
// }