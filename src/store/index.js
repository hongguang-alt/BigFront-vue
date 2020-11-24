import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        codeUuid: 0,
        token: "",
        isLogin: false,
        userInfo: {}
    },
    //唯一改变state
    mutations: {
        setCodeUuid(state, value) {
            state.codeUuid = value
        },
        setLogin(state, value) {
            state.isLogin = value
        },
        setUserInfo(state, value) {
            state.userInfo = value
        }
    }
})

export default store