import axios from 'axios'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: 'http://127.0.0.1:5003/api',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

export const reqResolve = config => {
  // config.headers['token'] = localStorage.getItem('token')
  return config
}

export const reqReject = error => {
  console.error(error)
  return Promise.reject(error)
}

export const resResolve = response => {
  let data = response.data
  if (data.code === 200) {
    return data
  }
  if (data.code !== 200) {
    Toast.fail({
      forbidClick: true,
      message: data.msg,
      position: 'top'
    })
  }
}

export const resReject = error => {
  Toast.fail({
    forbidClick: true,
    message: '请求错误',
    position: 'top'
  })
  return Promise.reject(error)
}

http.interceptors.request.use(reqResolve, reqReject)
http.interceptors.response.use(resResolve, resReject)

export { http }
