const transformData = function(data = {}) {
    // 数组字段转字符串
    Object.keys(data).forEach(key => {
        if (key.indexOf('$$') > -1 && data[key] && data[key].length) {
            let value = data[key].join(',')
            let real_key = key.substr(2)
            data[real_key] = value
            delete data[key]
        }
    })
    Object.keys(data).forEach(key => {
        // 过滤私有字段
        if (key.substr(0, 1) === '$') {
            delete data[key]
        }
        // 过滤空字符以及undefined
        if (data[key] === '' || data[key] === undefined || data[key] === null) {
            delete data[key]
        }
        if (typeof data[key] === 'object' && !data[key]['length']) {
            transformData(data[key])
        }
    })
}

export const exAuth = Object.freeze({
    onBefore(config) {
        // 支持restful格式的api /news/detail/{id}
        let body = config.params || config.data || config.body || {}
        config.url = config.url.replace(/\{(.+?)\}/g, ($1, key) => {
            let result = body[key] || ''
            return result
        })
        if (config.params) {
            transformData(config.params)
        }
        if (config.data) {
            transformData(config.data)
        }
    },
    onComplete(config, isResolve, resOrErr) {
        // 登录失效
        if (resOrErr.code == '300') {
            try {
                if (window.parent) {
                    window.parent.postMessage(
                        { type: 'logout', message: '登录失效' },
                        '*',
                    )
                }
            } catch (err) {
                console.warn(err)
            }
        }
    },
})

export default exAuth
