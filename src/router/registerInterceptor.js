/**
 * @param {import('vue-router').default} router
 */
import store from '@/store'
export default function(router) {
    if (router._registerInterceptor) return
    router._registerInterceptor = true

    const whiteList = ['/404', '/500', '/login']
    router.beforeEach((to, from, next) => {
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            store
                .dispatch('app/SYNC_INIT')
                .then(() => {
                    next()
                })
                .catch(err => {
                    console.error(err)
                    next({ path: '/500' })
                })
        }

        // if(to.meta.requireAuth){
        //     if(store.state.userId){
        //         next()
        //     }else{
        //         next({path:'/b'})
        //     }
        // }else{
        //     next()
        // }
    })
    /* 页面标题处理 */
    router.afterEach(to => {
        let { title } = to.meta
        title = typeof title === 'function' ? title(to) : title
        if (title) {
            document.title = title
        }
    })
}
