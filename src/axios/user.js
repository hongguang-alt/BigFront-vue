import axios from './index'

export const sign = () => {
    return axios.get('/user/sign')
}