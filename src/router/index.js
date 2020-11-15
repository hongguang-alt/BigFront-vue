import VueRouter from 'vue-router'

const Login = () => import( /* webpackChunkName: "my-login" */ '../views/Login.vue')
const Reg = () => import( /* webpackChunkName: "my-login" */ '../views/Reg.vue')
const FindP = () => import( /* webpackChunkName: "my-login" */ '../views/FindP.vue')

const routes = [{
        path: "/",
        redirect: "/login"
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