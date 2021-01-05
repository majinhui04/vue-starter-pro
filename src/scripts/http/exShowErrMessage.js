import { Message } from 'element-ui'

const Cache = {}

export const exShowErrMessage = Object.freeze({
    onBefore(config) {},
    onComplete(config, isResolve, resOrErr) {
        const message = resOrErr.message || resOrErr.error

        if (!config.exNoErrorMassage && !isResolve) {
            if (!Cache[message]) {
                Cache[message] = 1
                Message.error(message)
                setTimeout(() => {
                    delete Cache[message]
                }, 1000)
            }
        }
    },
})

export default exShowErrMessage
