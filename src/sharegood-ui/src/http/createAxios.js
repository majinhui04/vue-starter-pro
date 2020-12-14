/**
 * 这里的配置项及拦截器通常和业务无关
 * 请求拦截器的执行顺序：最后注册--->最先注册
 * 响应拦截器的执行顺序：最先注册--->最后注册--->then
 * 根据顺序做好数据及状态的传递
 */

import _ from 'lodash'
import axios from 'axios'
import mergeConfig from 'axios/lib/core/mergeConfig'
// import { qsStringify } from '../utils'
import wrapAxios from './wrapAxios'
// import exShowLoading from './exShowLoading'
import * as exCancel from './exCancel'

import HttpError from './HttpError'

/**
 * 发送前拦截 (全局)
 * @param {Parameters<axios['create']>[0]} config
 */
const requestHandle = config => {
    exCancel.setConfig(config)
    return config
}

/* 发送失败拦截 (全局) */
const requestErrHandle = err => {
    throw err
}

/**
 * 响应成功拦截 (全局)
 * @param {import('axios').AxiosResponse} res
 */
const responseHandle = res => {
    res.exData = _.get(res.data, 'data')

    return res
}

/* 响应失败拦截 (全局) */
const responseErrHandle = err => {
    if (err.response) {
        err.response.exData = _.get(err.response.data, 'data')
    }
    const result = HttpError.info(err)
    return Promise.reject(result)
}
// 重试
const axiosRetryInterceptor = function(err) {
    var config = err.config
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.exRetry) return Promise.reject(err.data)

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0
    config.retry = config.retry || 3
    config.retryDelay = config.retryDelay || 1000

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err)
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
 * @param {Parameters<axios['create']>[0]} requestConfig
 * @param {(instance: ReturnType<axios['create']>) => any} [callback]
 */
export const createAxios = (requestConfig, callback) => {
    const defaults = {
        /* 默认配置 */
        // paramsSerializer: params => qsStringify(params),
    }

    const _axios = axios.create(mergeConfig(defaults, requestConfig))
    const instance = wrapAxios(_axios)
    //instance.exHooks.add(exError)
    instance.exHooks.add(exCancel.hooks)
    instance.interceptors.request.use(requestHandle, requestErrHandle)
    instance.interceptors.response.use(responseHandle, responseErrHandle)
    // instance.interceptors.response.use(axiosRetryInterceptor.bind(instance), function(err){
    //     throw err
    // })
    callback && callback(instance)
    return instance
}

export default createAxios
