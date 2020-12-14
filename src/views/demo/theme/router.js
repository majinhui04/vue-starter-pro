/* eslint-disable */
const DemoTheme = () => import(/* webpackChunkName: "DemoTheme" */ '@/views/demo/theme');
export default {
    path: '/demo/theme',
    name: 'DemoTheme',
    component: DemoTheme,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: []
    }
};