import { mock } from 'mockjs'

export const post_api_pub_core_dictionary_definitions_page = function() {
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
}

export const delete_api_pub_core_dictionary_definitions_vid$ = function(
    opts,
    query,
) {
    const { pageNum, pageSize } = query

    return mock({
        status: true,
    })
}
