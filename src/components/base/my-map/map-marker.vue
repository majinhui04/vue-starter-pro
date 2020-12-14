<template>
    <!-- 地图查看 -->
    <div class="baidu-map-wrap">
        <div class="header">
            <!-- 企业查 -->
            <div class="" style="width:300px;margin-right:15px;">
                <span style="display:none" v-html="target"></span>

                <el-input
                    v-model.trim="query.model.keyWord"
                    placeholder="企业名称/统一社会信用代码/注册码"
                    @keyup.native.enter="handleSearch"
                >
                    <template slot="append">
                        <el-button
                            icon="el-icon-search"
                            circle
                            @click="handleSearch"
                        ></el-button>
                    </template>
                </el-input>
            </div>
            <!-- 查询 -->
            <my-nav @submit="onQuerySubmit"></my-nav>
        </div>

        <div class="baidu-map-view">
            <!-- map -->
            <baidu-map
                ref="bMap"
                :center="mapCenter"
                :zoom="myZoom"
                @ready="handler"
                class="bm-view"
                :scroll-wheel-zoom="scrollWheelZoom"
            >
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                <!-- 行政区 -->
                <my-boundary></my-boundary>
                <!-- 一级网格 -->
                <my-grid
                    hoverFillColor=""
                    :level="1"
                    :paths="level1List"
                    v-if="level1List.length"
                ></my-grid>
                <!-- 二级网格 -->
                <my-grid
                    hoverFillColor=""
                    :level="2"
                    :paths="level2List"
                    v-if="level2List.length"
                ></my-grid>
                <!-- 支行 -->
                <!-- <my-bank
                    v-if="banks.length && showBank"
                    :result="banks"
                    @click="handleBankClick"
                ></my-bank> -->
                <!-- <bml-marker-clusterer :averageCenter="true">
                    <my-company
                        v-if="query.result.length"
                        @save="handleSaveOne"
                        :result="query.result.concat(query.result)"
                    ></my-company>
                </bml-marker-clusterer> -->

                <!-- <my-company
                    :hasAction="false"
                    :result="query.result"
                ></my-company> -->
                <!-- 公司信息 -->
                <my-company-info
                    ref="companyRef"
                    :visible.sync="companyInfo.visible"
                    :position="companyInfo.position"
                    :result="companyInfo.result"
                    @save="handleSaveOne"
                ></my-company-info>
                <!-- 公司点 -->
                <my-point
                    :result="companyInfo.points"
                    @open="onPointOpen"
                ></my-point>
                <!-- <bm-point-collection
                    :points="companyInfo.points"
                    shape="BMAP_POINT_SHAPE_STAR"
                    color="red"
                    size="BMAP_POINT_SIZE_SMALL"
                ></bm-point-collection> -->
            </baidu-map>
        </div>
    </div>
</template>

<script>
// 文档  http://api.map.baidu.com/library/DrawingManager/1.4/docs/symbols/BMapLib.DrawingManager.html

import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import GeoUtils from './util'
import MyOverlay from './MyOverlay.vue'
import { BmlMarkerClusterer } from 'vue-baidu-map'
import MyNav from './MyNav'
import mix from './mix'
import MyGrid from './MyGrid'
import MyResult from './MyResult'
import MyBank from './MyBank'
import MyCompany from './MyCompany'

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: process.env.VUE_APP_BaiduMap_ak,
})
export default {
    mixins: [mix],
    components: {
        BmlMarkerClusterer,
        MyOverlay,
        MyNav,
        MyGrid,
        MyResult,
        MyBank,
        MyCompany,
    },
    name: 'MapQuery',
    props: {
        api: {
            type: String,
            default: 'get_grid_client', //  get_my_grid_client
        },
        showBank: {
            type: Boolean,
            default: true, //  get_my_grid_client
        },
    },
    data() {
        return {
            pDialog: {
                // 保存公司批次
                meta: {},
                visible: false,
            },

            query: {
                load: params => {
                    return this.handleSearch(params)
                },
                pagination: {
                    total: 0,
                    page: 1,
                    limit: 20,
                },
                visible: true, // 查询结果显示
                result: [], // 查询结果
                // 查询条件
                model: {
                    keyWord: '',
                    entName: '',
                },
            },

            result: {},
            myZoom: 12,
            current: {
                show: false,
            },
            banks: [],
            currentBank: {},
            isClose: false,
        }
    },
    watch: {
        gridCode: {
            handler(val) {
                this.filterLevel2(val)
            },
            //immediate: true,
        },
        // 一级
        pGridCode: {
            handler(val) {
                console.log('pGridCode', val)
                this.filterLevel1(val)
                this.filterLevel2('')
            },
            //immediate: true,
        },
    },
    async created() {},

    methods: {
        addFakePoint({ number = 200, icon }) {
            return Array.from({ length: number }).map(item => {
                let lng = 120.50184363078843 + Math.random()
                let lat = 30.43977726204149 + Math.random()
                return {
                    url: icon,
                    lng,
                    lat,
                }
            })
        },
        // handleProcessCompany(data = []) {
        //     //console.time('handleProcessCompany')
        //     let res = this.addFakePoint({
        //         number: 300000,
        //         icon: '/static/img/yellow.png',
        //     })
        //     this.companyInfo.points = this.companyInfo.points.concat(res)
        //     setTimeout(() => {
        //         let res = this.addFakePoint({ icon: '/static/img/red.png' })
        //         this.companyInfo.points = this.companyInfo.points.concat(res)
        //         setTimeout(() => {
        //             let res = this.addFakePoint({
        //                 icon: '/static/img/yellow.png',
        //             })
        //             this.companyInfo.points = this.companyInfo.points.concat(
        //                 res,
        //             )

        //             setTimeout(() => {
        //                 let res = this.addFakePoint({
        //                     icon: '/static/img/green.png',
        //                 })
        //                 this.companyInfo.points = this.companyInfo.points.concat(
        //                     res,
        //                 )
        //                 console.timeEnd('handleProcessCompany')
        //             }, 1000)
        //         }, 1000)
        //     }, 1000)
        // },
        filterLevel1(val) {
            console.log('filterLevel1', val)
            if (val) {
                this.level1List = this.level1Path.filter(
                    item => item.code === val,
                )
            } else {
                this.level1List = [...this.level1Path]
            }
        },
        filterLevel2(val) {
            console.log('filterLevel2', val)
            if (val) {
                this.level2List = this.level2Path.filter(
                    item => item.code === val,
                )
            } else {
                if (this.pGridCode) {
                    this.level2List = this.level2Path.filter(
                        item => item.$model.pGridCode === this.pGridCode,
                    )
                } else {
                    this.level2List = [...this.level2Path]
                }
            }
        },
        // 获取银行
        async syncBanks() {
            const result = await this.$api.get_grid_banks_options()

            this.banks = [...result.filter(item => item.$model.$position)]
        },

        // 菜单顶部查询
        onQuerySubmit(query) {
            console.log('onQuerySubmit', query)
            this.handleSearch({
                page: 1,
                ...query,
            })
        },
        // 一次性查询
        async handleSearch(params = {}) {
            const { model } = this.query
            const content =
                this.result && Object.keys(this.result).length
                    ? JSON.stringify(this.result)
                    : ''
            params = {
                pageNumber: 1,
                pageSize: 200,
                ...model,
                ...params,
                content,
            }
            console.log('params', params)
            // 启动计时器
            console.time('testForEach')
            let pageNumber = params.page || 1
            let { data: result } = await this.$api[this.api]({
                ...params,
                pageNumber,
            })
            let { data, total } = result

            // 停止计时，输出时间
            console.timeEnd('testForEach')
            console.log('handleSearch', result)
            this.query.result = data
            this.handleProcessCompany(data)
        },
        // 查询
        // async handleSearch(config = {}) {
        //     const { model } = this.query
        //     let pageNumber = config.page || 1
        //     const content = this.result ? JSON.stringify(this.result) : ''
        //     let params = {
        //         ...model,
        //         ...config,
        //         ...this.meta,
        //     }
        //     let { data: result } = await this.$api[this.api](
        //         {
        //             pageNumber,
        //             pageSize: 1,
        //             ...params,
        //         },
        //         {
        //             exShowLoading: true,
        //         },
        //     )
        //     let { total } = result
        //     let pageSize = 200
        //     let pages = Math.ceil(total / pageSize)
        //     let list = Array.from({ length: pages }).map((item, index) => {
        //         return {
        //             pageNumber: index + 1,
        //             pageSize: pageSize,
        //             ...params,
        //         }
        //     })
        //     // 启动计时器
        //     console.time('testForEach')
        //     let res = []
        //     await this.$utils.concurrency(
        //         list,
        //         async (item, index) => {
        //             return new Promise(async (resolve, reject) => {
        //                 try {
        //                     let { data: result } = await this.$api[this.api](
        //                         {
        //                             ...item,
        //                         },
        //                         {
        //                             exShowLoading: true,
        //                         },
        //                     )
        //                     res.push(...result.data)
        //                     resolve()
        //                 } catch (err) {
        //                     console.log(err)
        //                     resolve([])
        //                 }
        //             })
        //         },
        //         {
        //             concurrency: 10,
        //         },
        //     )

        //     //this.query.result = Object.freeze(res)
        //     this.query.result = res
        //     console.log('handleSearch', pages, list, this.meta)

        //     // 停止计时，输出时间
        //     console.timeEnd('testForEach')
        // },

        //
        save() {
            if (this.result) {
                this.handleSearch()
                this.$emit('success', this.result)
            } else {
                this.$message.warning('请选择区域')
            }
        },

        async handler({ BMap, map }) {
            this.isReady = true
            this.BMap = BMap
            this.map = map

            try {
                this.syncBanks()

                let level1List = []
                let level2List = []
                this.level1Path = await this.syncLevelPath({
                    gridLevel: 1,
                })
                this.level2Path = await this.syncLevelPath({
                    gridLevel: 2,
                })

                this.filterLevel1(this.pGridCode)
                this.filterLevel2(this.gridCode)
                await this.handleSearch()
            } catch (err) {
                console.error(err)
            }
        },
    },
}
</script>

<style lang="less">
.baidu-map-wrap {
    .marker-info {
        position: relative;
        padding-left: 35px;
    }
    .marker {
        position: absolute;
        left: 0px;
        top: 0px;
        display: inline-block;
        font-style: normal;
        font-size: 14px;
        text-align: center;
        width: 24px;
        height: 30px;
        // background-image: url(~@/assets/marker/红.svg);
        background-position: center;
        background-size: cover;
        color: #fff;
        padding-top: 3px;

        &.red {
            background-image: url(~@/assets/marker/red.svg);
        }
        &.blue {
            background-image: url(~@/assets/marker/blue.svg);
        }
        &.blue-light {
            background-image: url(~@/assets/marker/blue-light.svg);
        }
        &.gray {
            background-image: url(~@/assets/marker/gray.svg);
        }
        &.orange {
            background-image: url(~@/assets/marker/orange.svg);
        }
        &.yellow {
            background-image: url(~@/assets/marker/yellow.svg);
        }
        &.green {
            background-image: url(~@/assets/marker/green.svg);
        }
    }
    // .query-bar {
    //     display: flex;
    //     align-items: center;
    //     height: 100%;
    //     .query-item {
    //         height: 100%;
    //         padding: 10px 20px;
    //         color: #333;
    //         font-size: 16px;
    //         margin-right: 12px;
    //         cursor: pointer;
    //         &.active {
    //             background: #fff;
    //         }
    //     }
    // }
}
</style>
