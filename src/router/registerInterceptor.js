/**
 * @param {import('vue-router').default} router
 */
import store from '@/store'
export default function(router) {
    if (router._registerInterceptor) return
    router._registerInterceptor = true

    const whiteList = ['/404', '/500', '/login']
    router.beforeEach((to, from, next) => {
        const meta = to.meta || {}
        if (whiteList.indexOf(to.path) > -1 || meta.requireData) {
            store
                .dispatch('app/SYNC_INIT')
                .then(() => {
                    next()
                })
                .catch(err => {
                    console.error(err)
                    next({ path: '/500' })
                })
        } else {
            next()
        }
    })
    /* 页面标题处理 */
    router.afterEach(to => {
        let { title, bodyClass } = to.meta
        title = typeof title === 'function' ? title(to) : title
        if (title) {
            document.title = title
        }
        if (bodyClass) {
            document.body.className = bodyClass
        } else {
            document.body.className = ''
        }
    })
}
