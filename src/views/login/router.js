/* eslint-disable */
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/login')
export default {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
        bodyClass: 'my-login-page',
        parent: '',
        rank: 1,
        title: '登录',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
