import http from '@/scripts/http'

/**
 * @description 分页查询字典定义
 */
export const post_pub_core_dictionary_definitions_page = (
    params = {},
    config = {},
) => {
    params = {
        ...params,
    }
    return http.request({
        method: 'post',
        url: `/api/pub/core/dictionary/definitions/page`,
        body: params,
        exShowLoading: true,
        ...config,
    })
}

/**
 * @description 删除字典定义
 */
export const delete_pub_core_dictionary_definitions_vid$ = (
    params = {},
    config = {},
) => {
    params = {
        ...params,
    }
    return http.request({
        method: 'delete',
        url: `/api/pub/core/dictionary-definitions/{vid}`,
        body: params,
        exShowLoading: true,
        ...config,
    })
}
