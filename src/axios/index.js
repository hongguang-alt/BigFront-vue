import axios from 'axios'
import {
    BASE_URL
} from '../config/index'
axios.defaults.baseURL = BASE_URL;


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.authorization = 'Bearer ' + token
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios