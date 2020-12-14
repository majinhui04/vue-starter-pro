import * as API from '@/api'

// 企业查询
export const parseCompanyFields = config => {
    function getOptions(code) {
        const map = {}
        config.forEach(item => {
            map[item.code] = item
        })
        const result = map[code]
        if (result) {
            const options = []
            Object.keys(result.types).forEach(key => {
                options.push({
                    label: result.types[key],
                    value: key,
                })
            })
            return [...options]
        } else {
            return []
        }
    }
    return [
        {
            name: 'regstateLx',
            label: '企业存续',
            fieldType: 'select',
            isQuery: true,
            options: getOptions('regstateLx'),
        },
        {
            name: '$asset',
            label: '注册资产(万元)',
            fieldType: 'range',
        },
        {
            name: '$entEstDate',
            label: '成立时间',
            placeholder: '',
            fieldType: 'date',
            type: 'daterange',
            'value-format': 'yyyy-MM-dd',
        },
        {
            name: 'entName',
            label: '企业名称',
            placeholder: '',
            fieldType: 'input',
        },
        {
            name: 'cattype',
            label: '主体类型',
            placeholder: '',
            isQuery: true,
            fieldType: 'select',
            options: getOptions('regstateLx'),
        },
        {
            name: 'entType',
            label: '企业类型',
            placeholder: '',
            fieldType: 'select',
            isQuery: true,
            options: getOptions('entType'),
        },
        {
            name: '$hydm',
            label: '所属行业',
            placeholder: '',
            fieldType: 'cascader',
            filterable: false,
            clearable: true,
            props: { multiple: true },
            options: [],
        },
        {
            name: 'entDomdistrict',
            label: '所属区域',
            placeholder: '',
            fieldType: 'select',
            isQuery: true,
            options: () => {
                return API.get_street_options()
            },
        },
        {
            name: 'kjlqy',
            label: '是否科技行业',
            placeholder: '',
            isQuery: true,
            fieldType: 'select',
            options: [
                {
                    label: '是',
                    value: '1',
                },
                {
                    label: '否',
                    value: '0',
                },
            ],
        },
        {
            name: 'mclyxjb',
            label: '亩均论英雄',
            placeholder: '',
            isQuery: true,
            fieldType: 'select',
            options: getOptions('mclyxjb'),
        },
        {
            name: 'gsqy',
            label: '是否规上企业',
            placeholder: '',
            fieldType: 'select',
            options: getOptions('gsqy'),
        },
        {
            name: '$$zcfzl',
            label: '最近一期资产负债率',
            placeholder: '',
            fieldType: 'select',
            multiple: true,
            'collapse-tags': true,
            options: getOptions('zcfzl'),
        },
        {
            name: 'xszzl',
            label: '销售额增长率',
            placeholder: '',
            fieldType: 'select',

            options: getOptions('xszzl'),
        },
        {
            name: 'yzsxqy',
            label: '是否严重失信企业',
            placeholder: '',
            fieldType: 'select',
            isQuery: true,
            options: getOptions('yzsxqy'),
        },
        {
            name: '$$xsgm',
            label: '销售额',
            placeholder: '',
            fieldType: 'select',
            multiple: true,
            'collapse-tags': true,
            options: getOptions('xsgm'),
        },
        {
            name: '$$nsgm',
            label: '纳税总额',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            multiple: true,
            'collapse-tags': true,
            options: getOptions('nsgm'),
        },
        {
            name: '$$nszzl',
            label: '纳税总额增长率',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            multiple: true,
            'collapse-tags': true,
            options: getOptions('nszzl'),
        },
        {
            name: '$$ckgmD',
            label: '出口额',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            multiple: true,
            'collapse-tags': true,
            options: getOptions('ckgmD'),
        },
        {
            name: '$$dltbzzl',
            label: '电量同比',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            multiple: true,
            'collapse-tags': true,
            options: getOptions('dltbzzl'),
        },
        {
            name: '$$rzjsgm',
            label: '放贷金融机构数量',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            multiple: true,
            'collapse-tags': true,
            options: getOptions('rzjsgm'),
        },
        {
            name: '$$xsb',
            label: '销贷比',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            multiple: true,
            'collapse-tags': true,
            options: getOptions('xsb'),
        },
        {
            name: '$credit',
            label: '信用评分',
            placeholder: '',
            fieldType: 'range',
            visible: false,
        },
        {
            name: '$$yggm',
            label: '从业人数',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            multiple: true,
            'collapse-tags': true,
            options: getOptions('yggm'),
        },
        {
            name: 'sfsx',
            label: '金融机构是否有授信',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            options: getOptions('sfsx'),
        },
        {
            name: '$$rzegm',
            label: '用信余额',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            multiple: true,
            'collapse-tags': true,
            options: getOptions('rzegm'),
        },
        {
            name: 'sfkh',
            label: '是否本行开户',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            isQuery: true,
            options: getOptions('sfkh'),
        },
        {
            name: 'sfxs',
            label: '本行是否有授信',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            isQuery: true,
            options: getOptions('sfxs'),
        },
        {
            name: 'sfdk',
            label: '本行是否有贷款',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            isQuery: true,
            options: getOptions('sfdk'),
        },
        {
            name: 'sfgj',
            label: '本行国结',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            isQuery: true,
            options: getOptions('sfgj'),
        },
        {
            name: 'sfdfgz',
            label: '本行代发工资',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            isQuery: true,
            options: [
                {
                    label: '是',
                    value: '1',
                },
                {
                    label: '否',
                    value: '0',
                },
            ],
        },
        {
            name: 'sfzf',
            label: '是否拜访',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            isQuery: true,
            options: getOptions('sfzf'),
        },
        {
            name: 'fddbrhj',
            label: '法定代表人户籍',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            isQuery: true,
            options: getOptions('fddbrhj'),
        },
        {
            name: 'sfydh',
            label: '是否有电话',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            isQuery: true,
            options: getOptions('sfydh'),
        },
        {
            name: 'bhhmdqy',
            label: '是否黑名单',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            isQuery: true,
            options: getOptions('bhhmdqy'),
        },
        {
            name: 'sfbdcdy',
            label: '是否有不动产抵押',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            isQuery: true,
            options: getOptions('sfbdcdy'),
        },
        {
            name: '$$estyearQj',
            label: '成立年限',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            multiple: true,
            'collapse-tags': true,
            options: getOptions('estyearQj'),
        },
    ]
}

const gridState = function(val) {
    const map = {
        0: '初始状态', // 未添加
        1: '待分配', // 待分配支行
        2: '待支行分配', // 待分配项目经理
        3: '已分配',
        9: '其他',
    }
    return map[val] || '-'
}

// 营销状态
const bussinessSate = function(val) {
    const map = {
        1: '信贷客户',
        2: '结算客户',
        3: '潜在客户',
        4: '预警客户',
        5: '出险客户',
    }
    return map[val] || '-'
}

// 是否有国结
const sfgj = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
sfgj.$map = {}

// 金融机构是否授信
const sfsx = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
// 本行是否授信
const sfxs = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
// 是否开户
const sfkh = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
// 是否代发
const sfdfgz = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
// 是否有不动产抵押
const sfbdcdy = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
// 是否规上企业
const gsqy = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
// 是否环保黑名单企业
const hbhmdqy = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
// 是否环保实施企业
const hbssqy = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
// 是否通过准入
const ifZr = function(val) {
    const map = {
        0: '是',
        1: '否',
    }
    return map[val] || '-'
}
// 是否白名单
const isWhiteList = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
// 是否进出口企业
const jckqy = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
// 是否科技类企业
const kjlqy = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
// 是否退回
const backState = function(val) {
    const map = {
        0: '否',
        1: '是',
    }
    return map[val] || '-'
}
export {
    backState,
    kjlqy,
    jckqy,
    isWhiteList,
    ifZr,
    hbssqy,
    hbhmdqy,
    gsqy,
    sfgj,
    sfsx,
    sfxs,
    sfkh,
    sfdfgz,
    sfbdcdy,
    bussinessSate,
    gridState,
}

export const parseTableFields = function(config = []) {
    const fields = [
        {
            label: '分配状态',
            prop: 'gridState',
            width: '100px',
            render: (h, { row }) => {
                // this.$const.gridState(row.gridState)
                return this.$const.gridState(row.gridState)
            },
        },
        {
            label: '企业名',
            prop: 'entName',
            width: '200px',
            render: (h, { row }) => {
                return [
                    h(
                        'a',
                        {
                            class: 'sg-link',
                            attrs: {
                                target: '_blank',
                                href: row.detailUrl,
                            },
                        },
                        row.entName,
                    ),
                ]
            },
        },
        {
            width: '150px',
            label: '统一社会信用代码',
            prop: 'uniCode',
        },
        {
            width: '100px',
            label: '法定代表人',
            prop: 'leRep',
        },
        {
            label: '联系电话',
            prop: 'tel',
            width: '110px',
        },
        {
            label: '注册资金',
            prop: 'regCap',

            render: (h, { row }) => {
                //console.log(row.gridState, this.$const)
                return this.$utils.numberFormat(row.regCap)
            },
        },
        {
            label: '成立日期',
            prop: 'estDate',
            width: '120px',
        },
        {
            label: '所属区域',
            prop: 'streetName',
        },
        {
            label: '地址',
            prop: 'dom',
            width: '250px',
            render: (h, { row }) => {
                return [
                    h(
                        'a',
                        {
                            class: 'sg-link',
                            attrs: {
                                href: 'javascript:void(0)',
                            },
                            on: {
                                click: () => {
                                    this.handleOpenAddress(row)
                                },
                            },
                        },
                        row.dom,
                    ),
                ]
            },
        },
        {
            label: '信用评分',
            prop: 'xyfsYs',
        },
        {
            label: '一级网格',
            prop: 'gridCodeBankName',
        },
        {
            label: '二级网格',
            prop: 'gridCodeUserName',
        },
        {
            label: '归属支行',
            prop: 'gridCodeBankOwnerName',
        },
        {
            label: '归属客户经理',
            prop: 'gridCodeUserOwnerName',
        },
        {
            label: '是否通过准入',
            prop: 'ifZr',
            render: (h, { row }) => {
                if (row['ifZr'] == '1') {
                    return [
                        h('span', '否 '),
                        h(
                            'a',
                            {
                                class: 'sg-link',
                                attrs: {
                                    href: 'javascript:void(0)',
                                },
                                on: {
                                    click: () => {
                                        this.handleOpenPass(row)
                                    },
                                },
                            },
                            '详情',
                        ),
                    ]
                } else {
                    return this.$const.ifZr(row['ifZr'])
                }
            },
        },
        {
            label: '测算额度(万元)',
            prop: 'initialLimitamount',
            render: (h, { row }) => {
                if (row['initialLimitamount']) {
                    return this.$utils.formatMoney(row['initialLimitamount'])
                } else {
                    return '-'
                }
            },
        },
        {
            label: '是否开户',
            prop: 'sfkh',
            render: (h, { row }) => {
                return this.$const.sfkh(row['sfkh'])
            },
        },
        {
            label: '是否有授信',
            width: '120px',
            prop: 'sfxs',
            render: (h, { row }) => {
                return this.$const.sfxs(row['sfxs'])
            },
        },

        {
            label: '授信额度',
            prop: 'sxedNsh',
            render: (h, { row }) => {
                if (row['sxedNsh']) {
                    return this.$utils.formatMoney(row['sxedNsh'])
                } else {
                    return '-'
                }
            },
        },

        {
            label: '贷款余额(万元)',
            prop: 'dkyeNsh',
            render: (h, { row }) => {
                if (row['dkyeNsh']) {
                    return this.$utils.formatMoney(row['dkyeNsh'])
                } else {
                    return '-'
                }
            },
        },
        {
            label: '是否黑灰名单客户',
            prop: 'hbhmdqy',
            render: (h, { row }) => {
                return this.$const.hbhmdqy(row['hbhmdqy'])
            },
        },
        {
            label: '是否国结客户',
            prop: 'sfgj',
            render: (h, { row }) => {
                return this.$const.sfgj(row['sfgj'])
            },
        },
        {
            label: '是否代发工资客户',
            prop: 'sfdfgz',
            render: (h, { row }) => {
                return this.$const.sfdfgz(row['sfdfgz'])
            },
        },
        {
            label: '分配时间',
            prop: 'allotBatchTime',
        },
        {
            label: '最近走访日期',
            prop: 'visitTime',
        },
        {
            label: '是否退回',
            prop: 'backState',
        },
        {
            label: '退回日期',
            prop: 'backTime',
        },
        {
            label: '近次分配批次',
            prop: 'allotBatchNo',
            width: '100px',
        },
        {
            label: '近次分配批次名',
            prop: 'allotBatchName',
            width: '100px',
        },
        {
            label: '添加批次',
            prop: 'addBatchNo',
        },
        {
            label: '添加批次名',
            prop: 'addBatchName',
        },
        {
            label: '是否白名单',
            prop: 'isWhiteList',
            render: (h, { row }) => {
                if (row['isWhiteList'] == '1') {
                    return '是'
                }
                if (row['isWhiteList'] == '0') {
                    return '否'
                }
                return '-'
            },
        },
        {
            label: '是否贷款',
            prop: 'sfdk',
            render: (h, { row }) => {
                if (row['sfdk'] == '1') {
                    return '是'
                }
                if (row['sfdk'] == '0') {
                    return '否'
                }
                return '-'
            },
        },
    ]
    let result = config.map(key => {
        return fields.filter(item => item.prop === key)[0]
    })

    return result.filter(item => item)
}

// 网格客户查询
export const parseFormFields = (config = [], source = [], hidden = []) => {
    function getOptions(code) {
        const map = {}
        source.forEach(item => {
            map[item.code] = item
        })
        const result = map[code]
        if (result) {
            const options = []
            Object.keys(result.types).forEach(key => {
                options.push({
                    label: result.types[key],
                    value: key,
                })
            })
            return [...options]
        } else {
            return []
        }
    }
    const fields = [
        {
            name: 'gridState',
            label: '',
            placeholder: '',
            fieldType: 'FormItem',
        },
        {
            name: 'gridCodeBank',
            label: '一级网格',
            placeholder: '',
            fieldType: 'select',
            options: () => {
                return API.get_grid_options({
                    gridLevel: 1,
                }).then(options => {
                    return [{ label: '全部', value: '' }].concat(options)
                })
            },
        },
        {
            name: 'gridCodeUser',
            label: '二级网格',
            placeholder: '',
            fieldType: 'select',
            options: () => {
                return API.get_grid_options({
                    gridLevel: 2,
                }).then(options => {
                    return [{ label: '全部', value: '' }].concat(options)
                })
            },
        },
        {
            name: 'entName',
            label: '企业名称',
            placeholder: '',
            fieldType: 'input',
        },
        {
            name: 'entUnscId',
            label: '统一社会信用代码',
            placeholder: '',
            fieldType: 'input',
        },
        {
            name: 'entLepRep',
            label: '法定代表人',
            placeholder: '',
            fieldType: 'input',
        },
        {
            name: 'sfydh',
            label: '是否有联系电话',
            placeholder: '',
            isQuery: true,
            fieldType: 'select',
            options: getOptions('sfydh'),
        },
        {
            name: 'entDomdistrict',
            label: '所属区域',
            placeholder: '',
            fieldType: 'select',
            isQuery: true,
            options: () => {
                return API.get_street_options()
            },
        },
        {
            name: '$entEstDate',
            label: '成立时间',
            placeholder: '',
            fieldType: 'date',
            type: 'daterange',
            'value-format': 'yyyy-MM-dd',
        },
        {
            name: 'addBatchName',
            label: '添加批次',
            placeholder: '',
            fieldType: 'input',
        },
        {
            name: 'allotBatchName',
            label: '近期分配批次名称',
            placeholder: '',
            fieldType: 'input',
        },
        {
            name: 'sfkh',
            label: '是否开户',
            placeholder: '',
            isQuery: true,
            fieldType: 'select',
            options: getOptions('sfkh'),
        },
        {
            name: 'sfxs',
            label: '是否授信',
            visible: false,
            placeholder: '',
            fieldType: 'select',
            isQuery: true,
            options: getOptions('sfxs'),
        },
        {
            name: 'bhhmdqy',
            label: '是否黑灰名单客户',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            options: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '是',
                    value: '1',
                },
                {
                    label: '否',
                    value: '0',
                },
            ],
        },
        {
            name: 'sfgj',
            label: '是否国结客户',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            options: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '是',
                    value: '1',
                },
                {
                    label: '否',
                    value: '0',
                },
            ],
        },
        {
            name: 'sfdfgz',
            label: '是否代发工资客户',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            options: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '是',
                    value: '1',
                },
                {
                    label: '否',
                    value: '0',
                },
            ],
        },
        {
            name: 'ifZr',
            label: '是否通过准入',
            placeholder: '',
            fieldType: 'select',
            visible: false,
            options: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '否',
                    value: '1',
                },
                {
                    label: '是',
                    value: '0',
                },
            ],
        },
        {
            name: '$allotBatchDate',
            label: '分配日期',
            placeholder: '',
            fieldType: 'date',
            type: 'daterange',
            'value-format': 'yyyy-MM-dd',
        },
        {
            name: 'allotBatchNo',
            label: '分配批次',
            placeholder: '',
            fieldType: 'input',
        },
        {
            name: 'allotBatchName',
            label: '分配批次名称',
            placeholder: '',
            fieldType: 'input',
        },
        {
            name: 'gridCodeUserName',
            label: '归属客户经理',
            placeholder: '',
            fieldType: 'input',
        },
        {
            name: 'isWhiteList',
            label: '是否白名单',
            placeholder: '',
            fieldType: 'select',
            options: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '是',
                    value: '1',
                },
                {
                    label: '否',
                    value: '0',
                },
            ],
        },
        {
            name: 'allotSource',
            label: '分配来源',
            placeholder: '',
            fieldType: 'select',
            isQuery: true,
            options: [{ label: '上级来源', value: '1' }],
        },
    ]

    let result = config.map(key => {
        return fields.filter(item => item.name === key)[0]
    })

    return result
        .filter(item => item)
        .map(item => {
            if (hidden.indexOf(item.name) > -1) {
                item.visible = false
            }

            return item
        })
}
