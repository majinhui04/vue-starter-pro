import * as API from '@/api'
const state = {
    // 配置
    config: null,
    user: null,
    // app基础信息
    banks: [],
    // 查询配置
    options: [],
    // 所属行业
    industry: [],
}

const mutations = {
    // 配置
    SET_CONFIG(state, data) {
        state.config = data
    },
    // 支行
    SET_BANKS(state, data) {
        state.banks = data
    },
    SET_OPTIONS(state, data) {
        state.options = data
    },
    set_industry(state, data) {
        state.industry = data
    },
    set_user(state, data) {
        state.user = data
    },
}

const actions = {
    async SYNC_INIT({ commit, state }) {
        // await this.dispatch('app/sync_user')
        // await this.dispatch('app/SYNC_OPTIONS')
        //console.log(12345678, vv, aa, this)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
