/* eslint-disable */
const SystemRole = () =>
    import(/* webpackChunkName: "SystemRole" */ '@/views/system/role')
export default {
    path: '/system/role',
    name: 'SystemRole',
    component: SystemRole,
    meta: {
        //requireData:true,
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
