export const exConsole = Object.freeze({
    onBefore(config) {},
    onComplete(config, isResolve, resOrErr) {
        if (!isResolve) {
            console.warn(config.url, resOrErr, config.data, config.params)
        }
    },
})

export default exConsole
