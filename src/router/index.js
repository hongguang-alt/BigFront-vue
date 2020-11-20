import VueRouter from 'vue-router'

const Login = () => import( /* webpackChunkName: "my-login" */ '../views/Login.vue')
const Reg = () => import( /* webpackChunkName: "my-reg" */ '../views/Reg.vue')
const FindP = () => import( /* webpackChunkName: "my-findp" */ '../views/FindP.vue')
const Home = () => import( /* webpackChunkName: "my-home" */ '../views/Home.vue')
const routes = [{
        path: '/',
        name: "home",
        component: Home
    }, {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/reg',
        name: 'reg',
        component: Reg,
        //路由守卫
        beforeEnter: function (to, _from, next) {
            if (_from.name === 'login') {
                next()
            } else {
                next('/login')
            }
        }
    }, {
        path: '/findp',
        component: FindP
    }
]
const router = new VueRouter({
    routes // short for `routes: routes`
})
export default router