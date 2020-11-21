import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        codeUuid: 0,
        token: "",
        isLogin: false
    },
    //唯一改变state
    mutations: {
        setCodeUuid(state, value) {
            state.codeUuid = value
        }
    }
})

export default store