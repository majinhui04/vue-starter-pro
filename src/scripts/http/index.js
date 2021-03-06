import { createAxios } from '@/sharegood-ui/src/http'
import exShowLoading from './exShowLoading'
import exShowErrMessage from './exShowErrMessage'
import exConsole from './exConsole'
import exData from './exData'
import qs from 'qs'
const { requestConfig } = require('@/settings')
const {
    isResponseSuccess,
    getResponseError,
    getResponseSuccess,
    ...axiosConfig
} = requestConfig

const axiosRetryInterceptor = function(err) {
    // console.log('axiosRetryInterceptor',err.data,err.data.flag)
    if (err.data && err.data.flag == true) {
        return Promise.resolve(err.data)
    }
    var config = err.config
    if (!config || !config.exRetry) return Promise.reject(err.data)

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0
    config.retry = config.retry || 3
    config.retryDelay = config.retryDelay || 1000

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err.data)
    }

    // Increase the retry count
    config.__retryCount += 1

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve()
        }, config.retryDelay || 1)
    })

    // Return the promise in which recalls axios to retry the request
    return backoff.then(() => {
        return this.request(config)
    })
}
/**
 * 发送前拦截
 * @param {Parameters<createAxios>[0]} config
 */
const requestHandle = function(config) {
    config.headers = config.headers || {}
    const headers = config.headers
    const ContentType = headers['Content-Type'] || ''

    // 只有 ‘application/x-www-form-urlencoded’模式才需要对post的data做序列化
    if (
        config.data &&
        ContentType.indexOf('application/x-www-form-urlencoded') > -1
    ) {
        config.data = qs.stringify(config.data)
    }
    // if (config.url.indexOf('es') > -1) {
    //     console.log('-------requestHandle-------', config.timeout, config)
    // }
    return config
}

/* 发送失败拦截 */
const requestErrHandle = err => {
    throw err
}

/**
 * 响应成功拦截
 * @param {import('axios').AxiosResponse} res
 */
const responseHandle = function(response) {
    if (response.config.responseType === 'blob') {
        return Promise.resolve(response)
    }
    // 数据结果根据`content-type`来操作json数据以及文件流
    if (response.config.responseType === 'arraybuffer') {
        const headers = response.headers || {}
        const contentType = headers['content-type'] || ''
        const isJSON = contentType.indexOf('application/json') > -1
        if (isJSON) {
            try {
                const result = JSON.parse(
                    Buffer.from(response.data).toString('utf8'),
                )
                if (isResponseSuccess(result)) {
                    return Promise.resolve(result)
                } else {
                    result.code = -1
                    result.message = result.msg || result.message
                    return Promise.reject(result)
                }
            } catch (e) {
                return Promise.reject(e)
            }
        } else {
            return Promise.resolve(response)
        }
    }

    if (isResponseSuccess(response.data)) {
        return getResponseSuccess(response.data)
    } else {
        return getResponseError(response.data)
    }
}

/* 响应失败拦截 */
const responseErrHandle = err => {
    throw err
}

const http = createAxios(
    {
        ...axiosConfig,
    },
    instance => {
        instance.exHooks.add(exConsole)
        instance.exHooks.add(exData)
        instance.exHooks.add(exShowLoading)
        instance.exHooks.add(exShowErrMessage)
        instance.interceptors.request.use(requestHandle, requestErrHandle)
        instance.interceptors.response.use(
            responseHandle.bind(instance),
            responseErrHandle,
        )
    },
)
// 下载
http.download = function(config = {}) {
    config = {
        ...config,
        responseType: 'arraybuffer', // blob
    }

    return this.request(config).then(response => {
        if (response.headers) {
            let filename = response.headers['x-suggested-filename']

            if (!filename) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
                const matches = filenameRegex.exec(
                    response.headers['content-disposition'],
                )
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '')
                }
            }

            if (filename) {
                const url = window.URL.createObjectURL(
                    new Blob([response.data]),
                )
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('target', '_blank')
                link.setAttribute('download', decodeURIComponent(filename))
                link.click()
                window.URL.revokeObjectURL(url)

                return { code: 0, flag: true }
            } else {
                return { code: -1, message: '下载文件失败', flag: false }
            }
        } else {
            return response
        }
    })
}

export default http
