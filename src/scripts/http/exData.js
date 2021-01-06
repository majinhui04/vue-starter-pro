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
        // body字段转化
        const method = config.method
        if (config.body) {
            if (['delete', 'get', 'head', 'options'].indexOf(method) > -1) {
                config.params = config.body
            } else {
                config.data = config.body
            }
        }

        if (config.params) {
            transformData(config.params)
        }
        if (config.data) {
            transformData(config.data)
        }
    },
    onComplete(config, isResolve, resOrErr) {
        // if (isResolve) {
        //     const data = resOrErr.successfulPayload || {}
        //     return { data }
        // } else {
        //     const { data = {}, code } = resOrErr
        //     return {
        //         code,
        //         data,
        //     }
        // }
    },
})

export default exAuth
