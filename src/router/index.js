import VueRouter from 'vue-router'
import store from '../store'
// import jwt from 'jsonwebtoken'
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
const setForm = () => import( /* webpackChunkName: "set-form" */ '../components/user/set/Form.vue')
const setAvater = () => import( /* webpackChunkName: "set-avater" */ '../components/user/set/Avater.vue')
const setPas = () => import( /* webpackChunkName: "set-setpas" */ '../components/user/set/Pas.vue')
const setAccount = () => import( /* webpackChunkName: "set-account" */ '../components/user/set/AccountBind.vue')
const postCollect = () => import( /* webpackChunkName: "post-collect" */ '../components/user/posts/Collection.vue')
const postRelease = () => import( /* webpackChunkName: "post-collect" */ '../components/user/posts/Release.vue')
const NotFound = () => import( /* webpackChunkName: "notfound" */ '../views/NotFound.vue')
const Email = () => import( /* webpackChunkName: "email" */ '../views/Email.vue')
const ResetP = () => import( /* webpackChunkName: "resetp" */ '../views/ResetP.vue')
const Add = () => import( /* webpackChunkName: "add" */ '../views/Add.vue')


const routes = [{
        path: '/home',
        // name: "home",
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
        meta: {
            requiresAuth: true
        },
        children: [{
            name: 'user-center',
            // path: '/center/center',
            path: '/',
            component: MyCenter
        }, {
            name: 'user-msg',
            path: '/center/msg',
            component: Msg
        }, {
            // name: 'user-setting',
            path: '/center/setting',
            component: Setting,
            children: [{
                name: 'set-form',
                // path: '/center/setting/form',
                path: '/',
                component: setForm
            }, {
                name: 'set-avater',
                path: '/center/setting/avater',
                component: setAvater
            }, {
                name: 'set-pas',
                path: '/center/setting/pas',
                component: setPas
            }, {
                name: 'set-account',
                path: '/center/setting/account',
                component: setAccount
            }]
        }, {
            // name: 'user-posts',
            path: '/center/posts',
            component: Posts,
            children: [{
                name: 'post-release',
                // path: '/center/posts/release',
                path: '/',
                component: postRelease
            }, {
                name: 'post-collect',
                path: '/center/posts/collect',
                component: postCollect
            }]
        }, {
            name: 'user-other',
            path: '/center/other',
            component: Other
        }, ]
    }, {
        name: 'email',
        path: '/email',
        component: Email
    }, {
        name: 'reset',
        path: '/reset',
        component: ResetP
    },
    {
        name: 'add',
        path: '/add',
        component: Add
    },
    {
        name: '404',
        path: '/404',
        component: NotFound
    }, {
        path: '*',
        redirect: '/404'
    }
]
const router = new VueRouter({
    //精准匹配
    linkExactActiveClass: 'layui-this',
    routes // short for `routes: routes`
})

//设置路由：重新构建vuex中的内容，需要权限的加上meta
/**
 * 最大的是路由管理，不让进入界面，其次是登陆权限状态
 * 将数据的验证放到vuex中去
 */
router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem('token')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const isLogin = localStorage.getItem('isLogin') === 'true'
    store.commit('setToken', token)
    store.commit('setUserInfo', userInfo)
    store.commit('setLogin', isLogin)

    //存在用户的权限，只对这个放行
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.

        if (isLogin) {
            next()
        } else {
            next('/login')
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router