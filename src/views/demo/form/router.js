/* eslint-disable */
const DemoForm = () => import(/* webpackChunkName: "DemoForm" */ '@/views/demo/form');
export default {
    path: '/demo/form',
    name: 'DemoForm',
    component: DemoForm,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '表单',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: []
    }
};