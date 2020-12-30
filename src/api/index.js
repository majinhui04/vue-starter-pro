import http from '@/scripts/http'

// 更新所有初始化状态的企业网格信息
export const xxx = (params = {}) => {
    params = {
        ...params,
    }
    return http.download({
        url: '/cus/grid/update-all-grid',
        params: params,
        method: 'get',
        exShowLoading: true,
    })
}
