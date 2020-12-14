import { Message } from 'element-ui'

export const exShowErrMessage = Object.freeze({
    onBefore(config) {},
    onComplete(config, isResolve, resOrErr) {
        const message = resOrErr.message || resOrErr.error

        if (!config.exNoErrorMassage && !isResolve) {
            if (message) {
                Message.error(message)
            }
        }
    },
})

export default exShowErrMessage
