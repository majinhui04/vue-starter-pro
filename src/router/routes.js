/* 动态 path 匹配例子：https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js */

import permissRouter from './permission-router'
import constantRouter from './constant-router'

/**
 * @type {import('vue-router').RouteConfig[]}
 */
export const routes = [
    ...constantRouter,
    ...permissRouter,
    {
        path: '*',
        redirect: '/404',
    },
]

export default routes
