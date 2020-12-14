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
        await this.dispatch('app/sync_user')
        await this.dispatch('app/SYNC_OPTIONS')
        //console.log(12345678, vv, aa, this)
    },
    sync_user({ commit, state }) {
        return API.get_user()
            .then(res => {
                const map = {
                    '1': {
                        value: '1',
                        name: '客户经理',
                    },
                    '2': {
                        value: '2',
                        name: '支行',
                    },
                    '3': {
                        value: '3',
                        name: '总行',
                    },
                }
                const data = res.data
                const role = map[data.roleLev] || {
                    value: '',
                    name: '未知',
                }
                res.data.$role = role
                commit('set_user', res.data)
                return res.data
            })
            .catch(err => {
                commit('set_user', {
                    value: '',
                    name: '未知',
                })
            })
    },
    sync_industry({ commit, state }) {
        if (state.industry.length) {
            return Promise.resolve(state.industry)
        }
        return API.get_industry_list().then(result => {
            console.log('result', result)
            commit('set_industry', result)
            return result
        })
    },
    sync_level1_grid({ commit, state }) {
        return API.get_grid_list({
            gridLevel: 1,
            pageNumber: 1,
            pageSize: 100,
        })
    },
    sync_level2_grid({ commit, state }) {
        return API.get_grid_list({
            gridLevel: 2,
            pageNumber: 1,
            pageSize: 100,
        })
    },
    SYNC_BANKS({ commit, state }) {
        if (state.banks.length) {
            return Promise.resolve(state.banks)
        }
        return API.get_grid_banks_options().then(options => {
            commit('SET_BANKS', options)
            return options
        })
    },
    SYNC_OPTIONS({ commit, state }) {
        // if (state.options.length) {
        //     return Promise.resolve(state.options)
        // }

        return API.get_common_selects().then(({ data }) => {
            const result = JSON.parse(data)

            commit('SET_OPTIONS', result)
            return result
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
