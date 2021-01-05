import * as API from '@/api'
const state = {
    // 配置
    config: null,
    user: null,
    sidebar: {
        opened: true,
        withoutAnimation: false,
    },
    device: 'desktop',
    size: 'medium',
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
