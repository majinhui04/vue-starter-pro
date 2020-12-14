/**
 * 全局统一处理异常（隐藏、上报...）
 */
//import * as fundebug from 'fundebug-javascript'
const isError = err => err instanceof Error
const isSystemError = function(err) {
    if (!isError(err)) return false
    const reg = /^(TypeError|SyntaxError|ReferenceError|URIError|EvalError|RangeError)$/
    return reg.test(err.name)
}

/* 捕获 Promise 的异常 */
window.addEventListener('unhandledrejection', function(event) {
    const { reason } = event
    console.log('unhandledrejection', event, reason, !isSystemError(reason))
    if (process.env.VUE_APP_ENV === 'test') {
        // fundebug.notify('unhandledrejection', reason)
    }

    if (!isSystemError(reason)) {
        if (
            process.env.VUE_APP_ENV === 'production' ||
            (isError(reason) && reason.isAxiosError)
        ) {
            event.preventDefault() // 隐藏
        } else {
        }
    }
})

console.error = (func => {
    return (...args) => {
        const err = args[0] || {}
        const { message } = err
        // 在这里就可以收集到console.error的错误
        // 做一些事情
        func.apply(console, args)
    }
})(console.error)
