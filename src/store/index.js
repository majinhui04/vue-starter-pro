import Vue from 'vue'
import Vuex from 'vuex'
import root from './root'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

/**
 * 全局唯一 Store 实例
 */
export const store = new Vuex.Store({
    strict: process.env.VUE_APP_ENV === 'dev',
    ...root,

    /* module 应该启用命名空间，即 namespaced: true */
    modules,
    getters,
    // plugins: [
    //     createPersistedState({
    //         //paths: ['app.update', 'app.auto_buy', 'order', 'user'],
    //         storage: window.sessionStorage,
    //     }),
    // ],
})

export default store
