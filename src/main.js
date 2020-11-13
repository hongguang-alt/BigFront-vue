import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'

//表单验证的组件
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import './config/formRules'
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver)

//基本样式
import './index.css'

//封装请求
import './axios'

//使用layui
import './assets/css/layui.css'
import './assets/layui'

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')