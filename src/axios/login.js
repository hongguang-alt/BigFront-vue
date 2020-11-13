import axios from './index'

//获取验证码
export const getSvgLogin = (params) => {
    return axios.get('/public/svgCaptcha', {
        params
    })
}

//忘记密码，发送邮件
export const getForget = (params) => {
    return axios.post('/public/forget', params)
}

//登陆接口
export const getLogin = (params) => {
    return axios.post('/user/login', params)
}