/* eslint-disable */
const Index = () => import(/* webpackChunkName: "Index" */ '@/views/index');
export default {
    path: '/',
    name: 'Index',
    component: Index,
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