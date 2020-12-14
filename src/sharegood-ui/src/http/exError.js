
import HttpError from './HttpError'
export const exError = Object.freeze({
    onBefore(config) {},
    onComplete(config, isResolve, resOrErr) {
        console.log(12367,isResolve,resOrErr)
    },
})

export default exError
