import VueRouter from 'vue-router'

const Login = () => import( /* webpackChunkName: "my-login" */ '../views/Login.vue')
const Reg = () => import( /* webpackChunkName: "my-login" */ '../views/Reg.vue')
const FindP = () => import( /* webpackChunkName: "my-login" */ '../views/FindP.vue')

const routes = [{
        path: "/",
        redirect: "/login"
    }, {
        path: '/login',
        component: Login
    },
    {
        path: '/reg',
        component: Reg
    }, {
        path: '/findp',
        component: FindP
    }
]
const router = new VueRouter({
    routes // short for `routes: routes`
})
export default router