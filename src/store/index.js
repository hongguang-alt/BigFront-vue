import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        codeUuid: 0,
        token: "",
        isLogin: false,
        userInfo: {
            count: 0,
            favs: 0
        }
    },
    //唯一改变state
    mutations: {
        setCodeUuid(state, value) {
            state.codeUuid = value
        },
        setLogin(state, value) {
            state.isLogin = value
            //设置浏览器上的login登陆
            localStorage.setItem('isLogin', value)
        },
        setToken(state, value) {
            state.token = value
            localStorage.setItem('token', value)
        },
        setUserInfo(state, value) {
            state.userInfo = value
            //设置浏览器上缓存的用户信息
            localStorage.setItem('userInfo', JSON.stringify(value))
        }
    }
})

export default store