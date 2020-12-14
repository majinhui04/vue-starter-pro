/**
 * @type {import('vue-router').RouteConfig[]}
 */
import router from '@/router'
const routes = [
    {
        path: '/404',
        name: '404',
        meta: { title: '404' },
        component: () =>
            import(/* webpackChunkName: "low-priority" */ '@/views/404.vue'),
    },
    {
        path: '/500',
        name: '500',
        meta: { title: '500' },
        component: () =>
            import(/* webpackChunkName: "low-priority" */ '@/views/500.vue'),
    },
]
if (process.env.VUE_APP_ENV === 'dev' || process.env.VUE_APP_ENV === 'test') {
    routes.unshift({
        path: '/component-examples',
        name: 'component-examples',
        meta: { title: '开发相关文档' },
        component: () => import('@/components/ComponentExamples/index.vue'),
        beforeEnter(to, from, next) {
            if (from.matched.length === 0 && from.path === '/') {
                next()
                return
            }
            next(false)
            window.open(router.resolve(to.fullPath).href)
        },
    })
    routes.unshift({
        path: '/',
        name: 'debug',
        meta: { title: '调试' },
        component: () => import('@/views/About.vue'),
    })
}
export default routes
