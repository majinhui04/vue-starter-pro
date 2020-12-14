import http from '@/scripts/http'
import store from '@/store'
import { dateFormat, formatMoney } from '@/scripts/utils'

function before(params = {}) {
    let { $entEstDate, $asset, $credit, $allotBatchDate } = params

    // 分配日期
    if ($allotBatchDate && $allotBatchDate.length === 2) {
        let value = $allotBatchDate
        params['allotBatchDateStart'] = value[0]
        params['allotBatchDateEnd'] = value[1]
    }
    // 企业注册时间
    if ($entEstDate && $entEstDate.length === 2) {
        let value = $entEstDate
        params['entEstDateStart'] = value[0]
        params['entEstDateEnd'] = value[1]
    }
    // 企业注册资产
    if ($asset && $asset.length === 2) {
        let value = $asset
        params['entRegCapMin'] = value[0]
        params['entRegCapMax'] = value[1]
    }
    // 企业信用
    if ($credit && $credit.length === 2) {
        let value = $credit
        params['xyfsYsMin'] = value[0]
        params['xyfsYsMax'] = value[1]
    }
}
function interceptCompany(item, index) {
    let { yxkhfl, entName } = item
    // todo 临时测试
    // 营销客户分类
    yxkhfl = yxkhfl || 3
    const bussinessSateMap = {
        1: '/static/img/green.png?_=' + new Date().valueOf(),
        2: '/static/img/yellow.png?_=' + new Date().valueOf(),
        3: '/static/img/gray.png?_=' + new Date().valueOf(),
        4: '/static/img/orange.png?_=' + new Date().valueOf(),
        5: '/static/img/red.png?_=' + new Date().valueOf(),
    }
    const bussinessSateMap2 = {
        1: 'green',
        2: 'yellow',
        3: 'gray',
        4: 'orange',
        5: 'red',
    }
    item.$index = index + 1
    item.$title = item.entName
    item.$showFlag = false
    item.$checked = false
    item.$class = bussinessSateMap2[yxkhfl] || bussinessSateMap2[3]
    item.$url = bussinessSateMap[yxkhfl] || bussinessSateMap[3]
    item.$tags = []
    // 开户
    if (item.sfkh == 1) {
        item.$tags.push({
            type: 'info',
            label: '已开户',
        })
    }
    if (item.sfkh == 0) {
        item.$tags.push({
            type: 'info',
            label: '未开户',
        })
    }
    // 授信
    if (item.sfxs == 1) {
        item.$tags.push({
            type: 'info',
            label: '有授信',
        })
    }
    if (item.sfxs == 0) {
        item.$tags.push({
            type: 'info',
            label: '无授信',
        })
    }
    // 贷款
    if (item.sfdk == 1) {
        item.$tags.push({
            type: 'info',
            label: '有贷款',
        })
    }
    if (item.sfdk == 0) {
        item.$tags.push({
            type: 'info',
            label: '无贷款',
        })
    }
    // 国结
    if (item.sfgj == 1) {
        item.$tags.push({
            type: 'info',
            label: '有国结',
        })
    }
    if (item.sfgj == 0) {
        item.$tags.push({
            type: 'info',
            label: '无国结',
        })
    }

    if (item.sfdfgz == 1) {
        item.$tags.push({
            type: 'info',
            label: '本行代发工资',
        })
    }
    if (item.sfdfgz == 0) {
        item.$tags.push({
            type: 'info',
            label: '本行未代发工资',
        })
    }
    if (item.bhhmdqy == 1) {
        item.$tags.push({
            type: 'danger',
            label: '本行黑名单',
        })
    }
}
// 网格 options
export const get_grid_options = params => {
    params = {
        pageNumber: 1,
        pageSize: 100,
        ...params,
    }
    return http
        .request({
            method: 'get',
            url: '/cus/grid/page-grid',
            params: params,
        })
        .then(res => {
            return res.data.data.map(item => {
                return {
                    parent: item.pGridCode,
                    label: item.gridName,
                    value: item.gridCode,
                    $model: {
                        ...item,
                    },
                }
            })
        })
}

// 网格查询
export const get_grid_list = params => {
    const user = store.state.app.user
    // console.log(1, user)
    params = {
        // pageNumber: 1,
        // pageSize: 20,
        ...params,
    }
    return http.request({
        url: '/cus/grid/page-grid',
        params: params,
    })
}
// 地图网格查询 不是实时的数据
export const get_grid_list_es = params => {
    let { $entEstDate, $asset, $credit, $allotBatchDate } = params

    // 分配日期
    if ($allotBatchDate && $allotBatchDate.length === 2) {
        let value = $allotBatchDate
        params['allotBatchDateStart'] = value[0]
        params['allotBatchDateEnd'] = value[1]
    }
    // 企业注册时间
    if ($entEstDate && $entEstDate.length === 2) {
        let value = $entEstDate
        params['entEstDateStart'] = value[0]
        params['entEstDateEnd'] = value[1]
    }
    // 企业注册资产
    if ($asset && $asset.length === 2) {
        let value = $asset
        params['entRegCapMin'] = value[0]
        params['entRegCapMax'] = value[1]
    }
    // 企业信用
    if ($credit && $credit.length === 2) {
        let value = $credit
        params['xyfsYsMin'] = value[0]
        params['xyfsYsMax'] = value[1]
    }
    params = {
        pageNumber: 1,
        pageSize: 20,
        ...params,
    }
    return http
        .request({
            url: '/cus/pool/page-cus-pool-es',
            params: params,
            exShowLoading: true,
            timeout: 30 * 1000,
        })
        .then(res => {
            res.data.data = res.data.data || []
            res.data.data.forEach(interceptCompany)
            return res
        })
}

// 新增网格
export const post_grid = params => {
    params = {
        gridName: '',
        remark: '',
        ...params,
    }
    //delete params.content
    return http.request({
        method: 'post',
        url: '/cus/grid/add-grid',
        data: params,
        exShowLoading: true,
    })
}

// 更新网格
export const put_grid = params => {
    params = {
        ...params,
    }
    //delete params.content

    return http.request({
        method: 'post',
        url: '/cus/grid/update-grid',
        data: params,
        exShowLoading: true,
    })
}

// 删除网格
export const delete_grid = params => {
    params = {
        gridCode: '',
        ...params,
    }
    return http.request({
        url: '/cus/grid/delete-grid',
        params: params,
    })
}

// 网格详情
export const get_grid_detail = params => {
    params = {
        gridCode: '',
        ...params,
    }
    return http.request({
        url: '/cus/grid/detail',
        params: params,
    })
}

// 网格导入
export const post_grid_imp = params => {
    return http.get(
        '/cus/grid/imp',
        {
            data: params,
            exShowLoading: true,
            exNoErrorMassage: true,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    )
}

// 支行opions
export const get_grid_banks_options = params => {
    params = {
        ...params,
    }
    return http
        .request({
            method: 'get',
            url: '/cus/grid/get-banks',
            params: params,
            pageSize: 100,
        })
        .then(res => {
            return res.data.map((item, index) => {
                let { orgGisMark = '' } = item
                orgGisMark = orgGisMark || ''
                orgGisMark = orgGisMark.split(',')
                let lng = Number(orgGisMark[0])
                let lat = Number(orgGisMark[1])
                const posistion = {
                    lng,
                    lat,
                }
                // 银行坐标
                item.$position = lng > 0 && lat > 0 ? posistion : null
                item.$url = '/static/img/blue.png?_=' + new Date().valueOf()
                item.$showFlag = false
                return {
                    label: item.name,
                    value: item.code,
                    $model: item,
                }
            })
        })
}

// 客户经理
export const get_bank_manger_options = params => {
    params = {
        orgCode: '',
        ...params,
    }
    return http
        .request({
            url: '/cus/grid/get-users',
            params: params,
        })
        .then(res => {
            return res.data.map(item => {
                return {
                    label: item.realName,
                    value: item.id,
                }
            })
        })
}
// get-common-selects
// 公共options
export const get_common_selects = params => {
    return http.request({
        url: '/cus/pool/get-common-selects',
        //method:'post',
        params: params,
    })
}

// 网格客户库查询
export const get_grid_client = (params = {}, config = {}) => {
    before(params)
    return http
        .request({
            url: '/cus/pool/page-grid-cus-pool',
            params: params,
            ...config,
        })
        .then(res => {
            res.data.data = res.data.data || []
            res.data.data.forEach(interceptCompany)
            return res
        })
}

// 我的网格客户分页查询
export const get_my_grid_client = (params = {}, config = {}) => {
    before(params)
    return http
        .request({
            url: '/cus/pool/page-my-grid-customer',
            params: params,
        })
        .then(res => {
            res.data.data = res.data.data || []
            res.data.data.forEach(interceptCompany)
            return res
        })
}

// 公司查询 客户库
export const get_company_list = params => {
    before(params)

    return http.request({
        url: '/cus/pool/page-cus-pool',
        params: params,
    })
}

// 所属行业
export const get_industry_list = params => {
    return http
        .request({
            url: '/cus/pool/get-industry',
            params: params,
        })
        .then(({ data }) => {
            const result = {}
            const map = {}
            data.forEach(item => {
                const { name, id } = item
                map[id] = {
                    label: name,
                    value: id,
                }
            })
            data.forEach(item => {
                const { pId, name, id } = item
                // 假如是一级目录
                if (pId == '0') {
                    if (!result[id]) {
                        result[id] = {
                            label: name,
                            value: id,
                            children: [],
                        }
                    }
                } else {
                    if (!result[pId]) {
                        result[pId] = {
                            ...map[pId],
                            children: [],
                        }
                    }
                    result[pId].children.push(map[id])
                }
            })
            let res = Object.keys(result).map(key => {
                return result[key]
            })

            return res
        })
}

// 街道
export const get_street_options = params => {
    return http
        .request({
            url: '/cus/pool/get-org-street',
            params: params,
        })
        .then(({ data }) => {
            return data.map(item => {
                return {
                    label: item.content,
                    value: item.code,
                }
            })
        })
}
// 获取添加批次编号
export const get_add_batch = params => {
    return http.request({
        url: '/cus/pool/get-add-batch-no',
        params: params,
        exShowLoading: true,
    })
}
// 获取分配批次编号
export const get_allot_batch = params => {
    return http.request({
        url: '/cus/pool/get-allot-batch-no',
        params: params,
    })
}
// 保存企业的添加批次信息,更新为待分配状态
export const save_ent_add_batch = params => {
    return http.request({
        url: '/cus/pool/save-ent-add-batch',
        params: params,
        exShowLoading: true,
    })
}
// 一键保存企业的添加批次信息,更新为待分配状态
export const save_ent_add_batch_by_params = params => {
    return http.request({
        method: 'post',
        url: '/cus/pool/save-add-batch-by-params',
        data: params,
        exShowLoading: true,
    })
}
// 地图一键保存企业的添加批次信息,更新为待分配状态
export const save_ent_add_batch_by_params_es = params => {
    return http.request({
        method: 'post',
        url: '/cus/pool/add-cus-pool-es',
        data: params,
        exShowLoading: true,
    })
}

export const save_ent_allot_batch = params => {
    params = {
        batchName: '',
        batchNo: '',
        pripids: '',
        ...params,
    }
    return http.request({
        exTitle: '保存企业的分配批次信息,分配给支行',
        url: '/cus/pool/save-ent-allot-batch',
        params: params,
        exShowLoading: true,
    })
}

export const save_allot_batch_by_params = params => {
    params = {
        batchName: '',
        batchNo: '',
        ...params,
    }
    return http.request({
        exTitle: '一键保存企业的分配批次信息',
        url: '/cus/pool/save-allot-batch-by-params',
        method: 'post',
        data: params,
    })
}

export const save_ent_claim = params => {
    params = {
        ...params,
    }
    return http.request({
        exTitle: '网格客户池:分配给客户经理',
        url: '/cus/pool/save-ent-claim',
        //method: 'post',
        params: params,
    })
}

// 网格移动
export const save_grid_move = params => {
    return http.request({
        url: '/cus/pool/move-grid',
        params: params,
        exShowLoading: true,
    })
}

// 获取当前用户
export const get_user = params => {
    return http.request({
        url: '/cus/pool/get-login-user',
        params: params,
    })
}

// 获取登录者所在支行的管理员
export const get_bank_admins_options = params => {
    return http
        .request({
            url: '/cus/pool/get-bank-admins',
            params: params,
        })
        .then(res => {
            res.data = res.data || []
            return res.data.map(item => {
                return {
                    value: item.id,
                    label: item.realName,
                }
            })
        })
}

// 添加白名单
export const add_ent_white = params => {
    ;['$checkUsers'].forEach(key => {
        let value = params[key].join(',')
        key = key.substr(1)
        params[key] = value
    })
    return http.request({
        url: '/cus/pool/add-ent-white',
        params: params,
    })
}
// 获取企业失败准入的原因
export const get_refuse_reason = params => {
    return http
        .request({
            url: '/cus/pool/get-refuse-reason',
            params: params,
            exShowLoading: true,
        })
        .then(res => {
            res.data.$rejectedReasonName = res.data.rejectedReasonName.split(
                ';',
            )
            return res
        })
}

// 给企业推消息
export const push_message_customer = params => {
    ;['$pripids'].forEach(key => {
        let value = params[key].join(',')
        key = key.substr(1)
        params[key] = value
    })
    return http.request({
        url: '/cus/pool/push-message-customer',
        params: params,
        exShowLoading: true,
    })
}

// 获取网格统计分析--户数,覆盖率统计
export const grid_account_chart = (params = {}) => {
    const { $dateRange } = params
    if ($dateRange && $dateRange.length === 2) {
        let value = $dateRange
        params['startDate'] = value[0]
        params['endDate'] = value[1]
    }

    return http
        .request({
            url: '/cus/grid/analyze/get-grid-account-chart',
            params: params,
            exShowLoading: true,
        })
        .then(res => {
            let result = res.data || []
            return result.map(item => {
                item['企业户数'] = item['企业数'] * 1
                item['日均100万以上户数'] = item['100数'] * 1
                item['日均500万以上户数'] = item['500数'] * 1

                // item['授信企业'] = item['企业户数']
                // item['授信金额'] = item['授信金额'] * 1
                // item['用信金额'] = item['用信金额'] * 1
                return item
            })
        })
}
// 获取网格统计分析--网格情况总览
export const get_grid_analyze = (params = {}) => {
    let { gridLevel, gridCode } = params

    if (gridLevel == '1') {
        params['gridCodeBank'] = gridCode
    }
    if (gridLevel == '2') {
        params['gridCodeUser'] = gridCode
    }
    return http.request({
        url: '/cus/grid/analyze/get-grid-analyze',
        params: params,
        // exShowLoading: true,
        //exCancel: 'analyze',
        //exCancelName: 'analyze',
    })
}

// 获取网格统计分析--放贷趋势
export const get_grid_loan_chart = (params = {}) => {
    params = {
        ...params,
    }
    const { $dateRange } = params
    if ($dateRange && $dateRange.length === 2) {
        let value = $dateRange
        params['startDate'] = value[0]
        params['endDate'] = value[1]
    }

    return http
        .request({
            url: '/cus/grid/analyze/get-grid-loan-chart',
            params: params,
            exShowLoading: true,
        })
        .then(res => {
            let data = res.data || {}
            let result = data.source || data || []
            return result.map(item => {
                item['授信企业'] = item['授信企业'] || ''
                //item['企业户数'] = item['企业户数'] * 1
                item['授信企业'] = item['授信企业'] * 1
                item['授信金额'] = item['授信金额'] * 1
                item['用信金额'] = item['用信金额'] * 1
                return item
            })
        })
}

// 获取网格统计分析--融资企业排行榜
export const get_grid_top = (params = {}) => {
    params = {
        type: 'credit',
        top: 10,
        estyearQj: '1',
        gridCodeBank: '',
        gridCodeUser: '',
        ...params,
    }

    return http
        .request({
            url: '/cus/grid/analyze/get-grid-top',
            params: params,
            exShowLoading: true,
        })
        .then(res => {
            let result = res.data || []
            let max = result[0].data
            return result.map(item => {
                const width = (item.data / max) * 100
                // console.log(width)
                return {
                    index: item.no,
                    label: item.name || '',
                    value: formatMoney(item.data),
                    width,
                }
            })
        })
}

// 导入网格
export const uploadGrid = (params = {}, config = {}) => {
    const file = params.file,
        name = file.name,
        fileType = file.type,
        isImage = fileType.indexOf('image') != -1,
        isLt2M = file.size / 1024 / 1024 < 2

    // 这里常规检验，看项目需求而定
    //   if (!isImage) {
    //     this.$message.error("只能上传图片格式png、jpg、gif!");
    //     return;
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("只能上传图片大小小于2M");
    //     return;
    //   }
    // 根据后台需求数据格式
    const form = new FormData()
    // 文件对象
    form.append('file', file)
    // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
    form.append('type', params.type)
    form.append('name', name)
    return http.request({
        method: 'post',
        url: '/cus/grid/imp',
        data: form,
        exShowLoading: true,
        headers: { 'content-type': 'multipart/form-data' },
    })
}

// 获取网格统计分析--融资企业排行榜
export const get_import_log = (params = {}) => {
    params = {
        ...params,
    }

    return http
        .request({
            url: '/cus/imp/log/page-imp-log',
            params: params,
        })
        .then(res => {
            const result = (res.data.data = res.data.data || [])
            result.forEach(item => {
                item.$type = item.type == '1' ? '一级网格' : '二级网格'
                item.$cTime = dateFormat(item.cTime)
            })
            return res
        })
}
// 下载导入异常数据
export const download_import_log = (params = {}) => {
    params = {
        ...params,
    }
    return http.download({
        url: '/cus/imp/log/download-error-file',
        params: params,
        method: 'get',
        exShowLoading: true,
    })
}

// 更新所有初始化状态的企业网格信息
export const update_all_grid = (params = {}) => {
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
