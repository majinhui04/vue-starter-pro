export const validateName = function(rule, value, callback) {
    if (value.length >= 4 && value.length <= 20) {
        callback()
    } else {
        callback(new Error('请输入4-20位数字、大小写字母或中文组合'))
    }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
