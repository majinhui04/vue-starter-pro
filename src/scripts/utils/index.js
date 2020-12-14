import _ from 'lodash'
import axios from 'axios'
import stringify from 'qs/lib/stringify'
import dateFns_format from 'date-fns/format'
import download from './download'
import DDM from '../ddm'
import concurrency from './concurrency'

export {
    concurrency,
    DDM,
    download, // 附件下载
}

/**
 * 时间格式化
 * @param {string | number | Date} date
 * @param {string} [format] 官方文档：https://date-fns.org/v1.30.1/docs/format#description
 * @example dateFormat('YYYY年MM月DD日 HH时mm分ss秒SSS毫秒 Z时区 Q季度 X秒时间戳 x毫秒时间戳')
 */
export const dateFormat = function(date, format = 'YYYY-MM-DD') {
    if (!date) return ''
    if (format === '@iso') format = 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    return dateFns_format(date, format)
}

/**
 * 将对象序列化成参数
 * @param {object} data
 * @param {Parameters<qs.stringify>[1]} [options]
 */
export const qsStringify = function(data, options) {
    options = { arrayFormat: 'repeat', ...options }
    return stringify(data, options)
}

/**
 * 将对象转成 formData
 * @typedef {string | number | boolean | File | Blob} Val
 * @param {{[key: string]: Val | Val[]}} data
 * @param {'repeat' | 'brackets' | 'indices'} [arrayFormat]
 */
export const toFormData = function(data, arrayFormat = 'repeat') {
    if (data instanceof FormData) return data
    const formData = new FormData()
    _.each(data, (val, key) => {
        if (val === undefined) return
        if (Array.isArray(val)) {
            val = val.filter(v => v !== undefined)
            val.forEach((v, i) => {
                let k = key
                if (arrayFormat === 'brackets') k += '[]'
                else if (arrayFormat === 'indices') k += `[${i}]`
                formData.append(k, v === null ? '' : v)
            })
        } else {
            formData.append(key, val === null ? '' : val)
        }
    })
    return formData
}

export const isNumber = function(value) {
    return typeof value === 'number' && !isNaN(value)
}

/**
 * @description 格式化人民币 eg:10000 => 10,000.00
 * @param {*} money
 */
export function formatMoney(money, decimal = 2) {
    if (Number(money) === 0 || Number.isNaN(Number(money))) return '0.00'
    return Number(money)
        .toFixed(decimal)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const numberFormat = function(
    number,
    decimals = 2,
    dec_point = '.',
    thousands_sep = ',',
) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
        dec = typeof dec_point === 'undefined' ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec)
            return '' + Math.floor(n * k) / k
        }
    s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.')
    var re = /(-?\d+)(\d{3})/

    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
}

/**
 * 判断是否为 axios 取消的请求
 */
export const isCancel = axios.isCancel
