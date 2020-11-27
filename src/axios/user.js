import axios from './index'

export const sign = () => {
    return axios.get('/user/sign')
}

//用户编辑接口
export const getEdit = (params) => {
    return axios.post('/user/basic', params)
}

//修改邮箱的接口
export const updateUsername = (params) => {
    return axios.post('/user/updateUserName', params)
}

//重置密码的接口
export const changePassword = (params) => {
    return axios.post('/user/resetPassword', params)
}

//上传头像
export const uploadImg = (formdata) => {
    return axios.post('/user/uploadImg', formdata)
}