import axios from './index'
import qs from 'qs'

//获取列表接口
export const getList = (params) => {
    return axios.get('/public/list?' + qs.stringify(params))
}

//获取温馨提醒或者友情链接接口
export const getLinks = (params) => {
    return axios.get('/public/links?' + qs.stringify(params))
}

//获取本周热议的接口
export const getHot = () => {
    return axios.get('/public/toWeek')
}