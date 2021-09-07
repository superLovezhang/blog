import axios from 'axios'

const request = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 5000,
    withCredentials: false
})

request.interceptors.request.use(function (config) {
    const token = window.localStorage.getItem('token')
    if (!!token) {
        config.headers['Authorization'] = token
    }
    return config
}, function (error) {
    return Promise.reject(error) 
})

request.interceptors.response.use(function (response) {
    const data = response.data
    if (data.code !== 200) {
        if (data.code === 4000) {
            window.localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(data.message)
    }
    return response
}, function (error) {
    return Promise.reject(error)
})

export default request