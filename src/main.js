import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import alert from './components/modules/alert'
import confirm from './components/modules/confirm'

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
import './assets/fly/global.css'

Vue.use(alert)
Vue.use(confirm)

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')