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
        let cb = target[name]
        let names = name.split('_')
        let method = names.splice(0, 1)[0]
        let hasSuffix = false
        let uri = names
            .map(name => {
                if (name.indexOf('$') > -1) {
                    hasSuffix = true
                    return ''
                } else {
                    return '/' + name
                }
            })
            .join('')

        let suffix = hasSuffix ? '/.+' : ''
        let reg = `reg:${uri}${suffix}`
        apis.push({
            uri,
            name,
            cb,
            method,
            reg,
        })
    })
})

for (let api of apis) {
    myMock(api.reg, api.method, api.cb)
}
/* 统一在这里注册 */
//myMock('reg:/news/getList\\?.+', 'get', news.getList)
// myMock('reg:/news/getList', 'post', news.getList)
// myMock('reg:/news/getDetails/.+', news.getDetails)
