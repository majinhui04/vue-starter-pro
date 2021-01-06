import { mock } from 'mockjs'

export const deleteDictionaryDefinitions = Object.freeze({
    url: '/api/pub/core/dictionary-definitions/{vid}',
    method: 'delete',
    onSuccess() {
        return mock({
            code: 1,
            status: false,
            unsuccessfulPayload: {
                name: 2,
            },
            successfulPayload: {
                name: 1,
            },
            message: '请求失败1111',
        })
    },
})
export const postDictionaryDefinitions = Object.freeze({
    url: '/api/pub/core/dictionary-definitions',
    method: 'post',
    onSuccess() {
        return mock({
            status: true,
            unsuccessfulPayload: {},
            successfulPayload: {
                total: 10,
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
