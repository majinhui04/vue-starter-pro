/* 官方示例：http://mockjs.com/examples.html */

import createMock from './createMock'
const myMock = createMock(process.env.VUE_APP_BASEURL_API)
const modules = {}
const apis = []
const requireContext = require.context('@/mock/modules', false, /\.js/)
const requireAll = context => {
    context.keys().forEach(key => {
        modules[key] = requireContext(key).default || requireContext(key)
    })
}

requireAll(requireContext)

Object.keys(modules).forEach(key => {
    let target = modules[key]
    Object.keys(target).forEach(name => {
        let result = target[name]
        let { url, method, onSuccess } = result
        var r = /\/\{.*?\}/g
        let suffix = r.test(url) ? '/.+' : ''
        url = url.replace(r, '')
        let reg = `reg:${url}${suffix}`
        apis.push({
            method,
            reg,
            onSuccess,
        })
    })
})
console.log('[mock apis]', apis)
for (let api of apis) {
    myMock(api.reg, api.method, api.onSuccess)
}
/* 统一在这里注册 */
//myMock('reg:/news/getList\\?.+', 'get', news.getList)
// myMock('reg:/news/getList', 'post', news.getList)
// myMock('reg:/news/getDetails/.+', news.getDetails)

// myMock('reg:/api/pub/core/dictionary-definitions', 'post', function() {
//     return {
//         status: true,
//         successfulPayload: {
//             message: 'ok',
//         },
//     }
// })
