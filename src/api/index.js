import interceptors from './interceptors'
import http from '@/scripts/http'
const modules = {}
const apis = {}
const requireContext = require.context('@/api/modules', false, /\.js/)
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

        apis[name] = cb
    })
})

const API = new Proxy(apis, {
    get(target, name) {
        const methods = ['get', 'post', 'put', 'delete', 'patch']
        if (methods.indexOf(name) > -1) {
            return function(...arg) {
                let method = name
                let url = arg[0]
                let params = arg[1]
                let config = arg[2]
                let interceptor = interceptors.filter(item => {
                    return item.name === url && item.method === method
                })[0] || {
                    onBefore() {},
                    onSuccess() {},
                }

                // console.log(arg, url, method, interceptor)
                let callback = function() {
                    const uri = interceptor.url || url
                    interceptor.onBefore(params)
                    return http
                        .request({
                            method: method,
                            url: uri,
                            body: params,
                            ...config,
                        })
                        .then(res => {
                            const result = interceptor.onSuccess(res)
                            if (result) {
                                return result
                            } else {
                                return res
                            }
                        })
                }
                return callback()
            }
        } else if (typeof target[name] === 'function') {
            return target[name]
        } else {
            let names = name.split('_')
            let method = names.splice(0, 1)[0]

            let uri = names
                .map(name => {
                    if (name.indexOf('$') > -1) {
                        name = name.replace('$', '')
                        return `{${name}}`
                    } else {
                        return '/' + name
                    }
                })
                .join('')
            console.log('uri', uri)
            // 'get' | 'delete' | 'post' | 'put' | 'patch'
            if (methods.indexOf(method) > -1) {
                return function(...arg) {
                    let callback = function(params, config) {
                        return http.request({
                            method,
                            url: uri,
                            body: params,
                            ...config,
                        })
                    }
                    return callback.apply(apis, arg)
                }
            } else {
                return function() {
                    return Promise.reject({ message: `[${name}] 函数不存在` })
                }
            }
        }
    },
})

export default API
