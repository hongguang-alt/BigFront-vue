import VueRouter from 'vue-router'

const Login = () => import( /* webpackChunkName: "my-login" */ '../views/Login.vue')
const Reg = () => import( /* webpackChunkName: "my-reg" */ '../views/Reg.vue')
const FindP = () => import( /* webpackChunkName: "my-findp" */ '../views/FindP.vue')
const Home = () => import( /* webpackChunkName: "my-home" */ '../views/Home.vue')
const Index = () => import( /* webpackChunkName: "home-index" */ '../views/channels/Index.vue')
const Template1 = () => import( /* webpackChunkName: "home-template1" */ '../views/channels/Template1.vue')

const routes = [{
        path: '/home',
        name: "home",
        component: Home,
        children: [{
            name: 'index',
            path: '/',
            component: Index
        }, {
            name: 'template1',
            path: '/home/:catalog',
            component: Template1
        }]
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
    linkExactActiveClass: 'layui-this',
    routes // short for `routes: routes`
})
export default router