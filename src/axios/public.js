import axios from './index'
//测试用户名是否存在
export const getUsername = (params) => {
    return axios.post('/public/checkUsername', params)
}
//测试昵称是否存在
export const getNickname = (params) => {
    return axios.post('/public/checkNickname', params)
}