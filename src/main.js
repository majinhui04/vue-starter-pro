import 'babel-polyfill'
import 'normalize.css'
import './styles/reset.less'
import Vue from 'vue'
import './catchError'
import './element-ui' // @PC.element-ui
// import './vant' // @H5.vant
import './styles/global.less'
import router from './router'
import store from './store'
import './injects'
import App from './App.vue'
//import * as fundebug from 'fundebug-javascript'
//import fundebugVue from 'fundebug-vue'
// fundebug.init({
//     apikey: '88501c4c60a9f757e789169eeb83b91ac81baa181c773475050b2c44bc4dd699',
//     releasestage: '海宁:stage',
// })
/* 条件编译 (必须是运行时可用的环境变量，并且变量值不能为 undefined，否则模块必定会打包) */
if (process.env.VUE_APP_MOCK === 'true') {
    require('@/mock')
}
if (process.env.VUE_APP_ENV === 'dev' || process.env.VUE_APP_ENV === 'stage') {
    //fundebug.notify('Test', 'Hello, Fundebug!')
    //require('./vconsole') // @H5
}

// 测试环境
if (process.env.VUE_APP_ENV === 'stage') {
    console.log('fundebugVue')

    //fundebugVue(fundebug, Vue)
    //fundebug.notify('Test', 'Hello, Fundebug!')
    //require('./vconsole') // @H5
}

Vue.config.devtools =
    process.env.VUE_APP_ENV === 'dev' || process.env.VUE_APP_ENV === 'stage'
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
