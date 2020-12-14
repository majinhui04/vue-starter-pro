import dd from 'gdt-jsapi'

const http = {
}
http.request = dd.httpRequest.bind(http);

const fireBefore = (exHooks, config) => {
    exHooks.forEach(({ onBefore }) => onBefore && onBefore(config))
}
const fireComplete = (exHooks, config, isResolve, resOrErr) => {
    exHooks.forEach(
        ({ onComplete }) =>
            onComplete && onComplete(config, isResolve, resOrErr),
    )
}
const complete = (promise, exHooks, config) => {
    promise.then(res => fireComplete(exHooks, config, true, res)).catch(e => e)
    promise.catch(err => fireComplete(exHooks, config, false, err))
    return promise.catch(err => {
        throw err
    })
}
function wrapRequest(instance) {
    const wrap = function(...args) {
        return wrap.request(...args)
    }

    wrap.exHooks = []
    wrap.exHooks.add = function(obj) {
        const _id = `${Date.now()}`
        this.push({ ...obj, _id })
        return () => {
            const index = this.findIndex(o => o._id === _id)
            index > -1 && this.splice(index, 1)
        }
    }

    wrap.request = function(config) {
        if (typeof config === 'string') {
            config = arguments[1] || {}
            config.url = arguments[0]
        } else {
            config = config || {}
        }
        //config = merge(this.defaults, config)
        fireBefore(this.exHooks, config)
        const promise = instance.request.call(this, config)
        return complete(promise, this.exHooks, config)
    }

    return wrap
}

export default http
// dd.httpRequest({
//     url: "http://localhost:8181/openapi/user/get",
//     method: "GET",
//     data: {
//       from: "政务钉钉",
//       production: "ZWDing",
//     },
//     dataType: "json",
//   }).then(res => {
//     console.log(res)
//   }).catch(err => {})