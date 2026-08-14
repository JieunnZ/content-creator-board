import axios from 'axios'
import { ElMessage } from 'element-plus';
const request = axios.create({
    baseURL: '/api',
    timeout: 10000
})

const getErrorMessage = (error) => {
    // 请求超时
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        return '请求超时'
    }
    // 网络断开
    if (error.message === 'Network Error' || !error.response) {
        return '网络连接失败'
    }

    if (error.response) {
        const { status, data } = error.response

        // 根据状态码返回对应提示
        const statusMap = {
            400: '请求参数错误',
            404: '请求的资源不存在',
            500: '服务器内部错误',
            502: '后端服务未启动，请检查服务器',
            503: '服务暂时不可用，请稍后重试',
        }

        // 优先使用后端返回的 message
        if (data?.message && typeof data.message === 'string') {
            return data.message
        }

        return statusMap[status] || `请求失败 (状态码: ${status})`
    }

    return '网络请求失败，请稍后重试'
}


// 响应拦截器
request.interceptors.response.use(
    res => res,
    error => {
        const message = getErrorMessage(error)
        ElMessage.error(message)
        return Promise.reject({ message })
    }
)

export default request