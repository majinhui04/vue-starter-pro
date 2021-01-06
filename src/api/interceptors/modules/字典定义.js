export const postDictionaryDefinitions = Object.freeze({
    name: '/api/pub/core/dictionary-definitions',
    method: 'post',
    onBefore(payload) {
        payload.xxx = 1
        console.log(12, payload)
    },
    onSuccess(payload) {
        let { data } = payload
        //console.log(333, data)
    },
})
