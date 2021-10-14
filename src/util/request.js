import axios from 'axios'

const request = axios.create({
    baseURL: '/open',
    timeout: 15000,
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
    if (data.code !== 1000) {
        if (data.code === 2002 || data.code === 2001) {
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(data.message)
    }
    return response.data
}, function (error) {
    return Promise.reject(error)
})

export default request