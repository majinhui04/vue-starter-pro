/**
 * !!!慎用全局注册
 * 这里只适合注册，具体实现需拆分到单独的文件
 */

import Vue from 'vue'
import * as utils from '@/scripts/utils'
import * as constants from '@/scripts/constants'
import * as api from '@/api'
import http from '@/scripts/http'
import '@/components'

import printJS from 'print-js'

import sharegoodUI from '@/sharegood-ui/src'
const SvgIcon = function() {
    return import(
        /* webpackChunkName: "low-priority" */ '@/components/SvgIcon/index.vue'
    )
}
Vue.prototype.$ShareGood = {
    DataView: {
        pagination: {
            page: 1,
            pageSize: 10,
            pageSizes: [10, 20, 50, 100, 200],
            paramsSerializer(params = {}) {
                const result = {}
                result.pageNumber = params.page || 1
                delete params.page
                delete params.limit

                return {
                    ...result,
                    ...params,
                }
            },
        },
    },
}
/* 原型属性/方法 Vue.prototype (使用 $ 前缀) */
Vue.prototype.$env = Object.freeze(process.env)
Vue.prototype.$utils = Object.freeze({ ...utils })
Vue.prototype.$const = Object.freeze({ ...constants })
Vue.prototype.$isCancel = utils.isCancel
Vue.prototype.$api = api
Vue.prototype.$http = http
Vue.prototype.$redirect = function(params = {}, isReload) {
    let urlQuery = $parseQuery()
    let { path, query } = params
    let p = []

    if (query) {
        query = {
            ...urlQuery,
            ...query,
        }
        Object.keys(query).forEach(key => {
            p.push(`${key}=${encodeURIComponent(query[key])}`)
        })
    }

    this.$router.push({
        path,
        query,
    })
    // if (isReload) {
    //     history.go(0)
    // }

    // path = path.split('?')[0]
    // path = path.replace('.html', '')

    // let suffix = p.length ? '?' + p.join('&') : ''
    // console.log(path, query, urlQuery, suffix)
    // window.location.href = path + '.html' + suffix
}
function $parseQuery() {
    let url = window.location.href
    let params = url.split('?')[1]
    if (params) {
        let query = params.split('&')
        let result = {}
        query.forEach(item => {
            const key = item.split('=')[0]
            const value = item.split('=')[1]
            result[key] = decodeURIComponent(value)
        })
        return result
    } else {
        return {}
    }
}
Vue.prototype.$parseQuery = $parseQuery
Vue.prototype.$getOptions = function(code) {
    const map = {}
    const config = this.$store.state.app.options
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
Vue.use(sharegoodUI)

/* 全局过滤器 Vue.filter */
Vue.filter('dateFormat', utils.dateFormat)

/* 全局指令 Vue.directive */

/* 全局混入 Vue.mixin */
Vue.mixin({
    methods: {
        handlePrint(id) {
            id = typeof id === 'string' ? id : 'print'
            console.log('handlePrint')
            printJS({
                printable: id,
                type: 'html',
                //properties: [
                //    { field: 'name', displayName: '姓名', columnSize:`50%`},
                //    { field: 'sex', displayName: '性别',columnSize:`50%`},
                //],
                // header: `<p class="custom-p"> 名单 </p>`,
                // style: '#printCons {width: 600px;} .no-print{width: 0px} .itemText1 { width: 200px } .itemText2 { width: 200px } .itemText3 { width: 200px } .itemText4 { width: 200px }',
                // gridHeaderStyle:'font-size:12px; padding:3px; border:1px solid; font-weight: 100; text-align:left;',
                // gridStyle:'font-size:12px; padding:3px; border:1px solid; text-align:left;',
                // repeatTableHeader: true,
                // scanStyles:true,
                targetStyles: ['*'],
                ignoreElements: ['no-print'],
            })
        },
    },
    data() {
        return {
            MyExportData: [],
            SortOptions: [
                { label: '默认排序', value: '', key: 'sort' },
                {
                    label: '按成立日期倒序',
                    value: 'estDate_DESC',
                    key: 'sort',
                },
                {
                    label: '按成立日期升序',
                    value: 'estDate_ASC',
                    key: 'sort',
                },
                {
                    label: '按注册资本倒序',
                    value: 'regCap_DESC',
                    key: 'sort',
                },
                {
                    label: '按注册资本升序',
                    value: 'regCap_DESC',
                    key: 'sort',
                },
                {
                    label: '按走访时间倒序',
                    value: 'visitTime_DESC',
                    key: 'sort',
                },
                {
                    label: '按走访时间升序',
                    value: 'visitTime_ASC',
                    key: 'sort',
                },
                {
                    label: '按信用评分倒序',
                    value: 'xyfsYs_DESC',
                    key: 'sort',
                },
                {
                    label: '按信用评分升序',
                    value: 'xyfsYs_ASC',
                    key: 'sort',
                },
                { label: '是否准入倒序', value: 'ifZr_DESC', key: 'sort' },
                { label: '是否准入升序', value: 'ifZr_ASC', key: 'sort' },
            ],
        }
    },
})

/* 全局组件 Vue.component */
Vue.component('svg-icon', SvgIcon)

/* 小插件 Vue.use (重量级插件放主目录，如：vue-router、vuex、element-ui、i18n ...) */
