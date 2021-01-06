const menus = require('./menus')
const requestConfig = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
        //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout: 10 * 1000, // 默认超时10s
    baseURL: process.env.VUE_APP_BASEURL_API,
    isResponseSuccess(body) {
        if (body.status) {
            return true
        } else {
            return false
        }
    },
    getResponseSuccess(res) {
        const data = res.successfulPayload || {}
        return Promise.resolve({ data })
    },
    getResponseError(res) {
        let { data, code, message } = res
        data = res.unsuccessfulPayload || {}
        return Promise.reject({ data, code, message })
    },
}
module.exports = {
    menus,
    requestConfig,
    title: 'Vue Element Admin',

    /**
     * @type {boolean} true | false
     * @description Whether show the settings right-panel
     */
    showSettings: true,

    /**
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
    tagsView: true,

    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: false,

    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    sidebarLogo: false,

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production',
}
