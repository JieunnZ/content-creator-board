import axios from 'axios'

const request = axios.create({
    baseURL: '/api',
    timeout: 10000
})

// 响应拦截器
request.interceptors.response.use(
    res => res,
    err => Promise.reject(err)
)

export default request