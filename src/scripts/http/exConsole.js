export const exConsole = Object.freeze({
    onBefore(config) {},
    onComplete(config, isResolve, resOrErr) {
        if (!isResolve) {
            //console.error(config.url, resOrErr.message)
        }
    },
})

export default exConsole
