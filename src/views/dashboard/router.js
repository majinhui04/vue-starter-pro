/* eslint-disable */
const Dashboard = () =>
    import(/* webpackChunkName: "Dashboard" */ '@/views/dashboard')
export default {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '控制面板',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
