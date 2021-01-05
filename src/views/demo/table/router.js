/* eslint-disable */
const DemoTable = () =>
    import(/* webpackChunkName: "DemoTable" */ '@/views/demo/table')
export default {
    path: '/demo/table',
    name: 'DemoTable',
    component: DemoTable,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
