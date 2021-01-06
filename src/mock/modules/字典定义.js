import { mock } from 'mockjs'

export const deleteDictionaryDefinitions = Object.freeze({
    url: '/api/pub/core/dictionary-definitions/{vid}',
    method: 'delete',
    onSuccess() {
        return mock({
            status: true,
            successfulPayload: {
                name: 1,
            },
        })
    },
})
export const postDictionaryDefinitions = Object.freeze({
    url: '/api/pub/core/dictionary-definitions',
    method: 'post',
    onSuccess() {
        return mock({
            status: true,
            successfulPayload: {
                total: 2,
                'list|10': [
                    {
                        note: '@name',
                        code: '',
                        mcdtCode: '',
                        'isValid|1': [true, false],
                        updateTime: '@date("yyyy-MM-dd")',
                        mcdtText: '@csentence(3, 5)',
                        'vid|+1': 1,
                        text: '@ctitle(10)',
                    },
                ],
            },
        })
    },
})
