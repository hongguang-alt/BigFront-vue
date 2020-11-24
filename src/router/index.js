import VueRouter from 'vue-router'

const Login = () => import( /* webpackChunkName: "my-login" */ '../views/Login.vue')
const Reg = () => import( /* webpackChunkName: "my-reg" */ '../views/Reg.vue')
const FindP = () => import( /* webpackChunkName: "my-findp" */ '../views/FindP.vue')
const Home = () => import( /* webpackChunkName: "my-home" */ '../views/Home.vue')
const Index = () => import( /* webpackChunkName: "home-index" */ '../views/channels/Index.vue')
const Template1 = () => import( /* webpackChunkName: "home-template1" */ '../views/channels/Template1.vue')
const Center = () => import( /* webpackChunkName: "center" */ '../views/Center.vue')
const MyCenter = () => import( /* webpackChunkName: "my-center" */ '../components/user/Center.vue')
const Msg = () => import( /* webpackChunkName: "my-msg" */ '../components/user/Msg.vue')
const Posts = () => import( /* webpackChunkName: "my-posts" */ '../components/user/Posts.vue')
const Setting = () => import( /* webpackChunkName: "my-settings" */ '../components/user/Setting.vue')
const Other = () => import( /* webpackChunkName: "my-other" */ '../components/user/Other.vue')
const MyPage = () => import( /* webpackChunkName: "page" */ '../views/MyPage.vue')


const routes = [{
        path: '/home',
        name: "home",
        linkExactActiveClass: 'layui-this',
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
    }, {
        path: '/mypage',
        name: 'mypage',
        component: MyPage
    }, {
        path: '/center',
        component: Center,
        linkExactActiveClass: 'layui-this',
        children: [{
            name: 'user-center',
            path: '/center/center',
            component: MyCenter
        }, {
            name: 'user-msg',
            path: '/center/msg',
            component: Msg
        }, {
            name: 'user-setting',
            path: '/center/setting',
            component: Setting
        }, {
            name: 'user-posts',
            path: '/center/posts',
            component: Posts
        }, {
            name: 'user-other',
            path: '/center/other',
            component: Other
        }]
    }
]
const router = new VueRouter({
    linkExactActiveClass: 'layui-this',
    routes // short for `routes: routes`
})
export default router