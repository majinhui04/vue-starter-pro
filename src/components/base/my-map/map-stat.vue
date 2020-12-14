<template>
    <div class="baidu-map-wrap stat">
        <div class="baidu-map-view">
            <baidu-map
                :double-click-zoom="false"
                ref="bMap"
                :center="myCenter"
                :zoom.sync="zoom"
                @ready="handler"
                class="bm-view"
                :scroll-wheel-zoom="scrollWheelZoom"
                @mousemove="mousemove"
            >
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                <my-boundary @mouseout="onBoundaryOut"></my-boundary>

                <!-- 一级网格 -->
                <my-grid
                    :level="1"
                    :paths="level1List"
                    v-if="level1List.length && !isManager"
                    @dblclick="onLevel1Click"
                    @mouseover="onGridOver"
                    @mouseout="mouseout"
                ></my-grid>
                <!-- 二级网格 -->
                <my-grid
                    :level="2"
                    :paths="level2List"
                    v-if="level2List.length"
                    @mouseover="onGridOver"
                    @mouseout="mouseout"
                ></my-grid>

                <!-- 支行 -->
                <!-- <my-bank :result="banks" v-if="banks.length"></my-bank> -->

                <!-- <my-overlay
                    v-if="bmInfoWindow.show"
                    :position="bmInfoWindow.position"
                    text="点击我"
                    class="sample1"
                    :active="active"
                    @mouseover.native="active = true"
                    @mouseleave.native="active = false"
                >
                    <div class="map-pane-content stat">
                        <p>
                            <span
                                >企业户数：{{
                                    bmInfoWindow.model.entCount
                                }}家</span
                            >
                        </p>
                        <p>
                            <span
                                >账户覆盖率：{{
                                    bmInfoWindow.model.accountPercent
                                }}%</span
                            >
                        </p>
                        <p>
                            <span
                                >基本账户覆盖率：{{
                                    bmInfoWindow.model.baseAccountPercent
                                }}%</span
                            >
                        </p>
                        <p>
                            <span
                                >授信总额：{{
                                    bmInfoWindow.model.creditMoney
                                }}万元</span
                            >
                        </p>
                        <p>
                            <span
                                >授信覆盖率：{{
                                    bmInfoWindow.model.creditPercent
                                }}%</span
                            >
                        </p>
                        <p>
                            <span
                                >用信总额：{{
                                    bmInfoWindow.model.loansMoney
                                }}万元</span
                            >
                        </p>
                        <p>
                            <span
                                >用信覆盖率：{{
                                    bmInfoWindow.model.loansPercent
                                }}%</span
                            >
                        </p>
                        <p>
                            <span
                                >企业网银覆盖率：{{
                                    bmInfoWindow.model.ebankPercent
                                }}%</span
                            >
                        </p>
                        <p>
                            <span
                                >代发工资覆盖率：{{
                                    bmInfoWindow.model.salaryPerCent
                                }}%</span
                            >
                        </p>
                        <p>
                            <span
                                >国际结算覆盖率：{{
                                    bmInfoWindow.model.settlementPerCent
                                }}%</span
                            >
                        </p>
                        <p>
                            <span
                                >日均100万以上户数：{{
                                    bmInfoWindow.model.dayMillionCount
                                }}家</span
                            >
                        </p>
                        <p>
                            <span
                                >日均500万以上户数：{{
                                    bmInfoWindow.model.dayFiveMillionCount
                                }}家</span
                            >
                        </p>
                    </div>
                </my-overlay> -->
            </baidu-map>

            <div
                class="map-pane-content stat"
                v-loading="bmInfoWindow.loading"
                v-show="bmInfoWindow.show"
            >
                <p>
                    <span>企业户数：{{ bmInfoWindow.model.entCount }}家</span>
                </p>
                <p>
                    <span
                        >账户覆盖率：{{
                            bmInfoWindow.model.accountPercent
                        }}%</span
                    >
                </p>
                <p>
                    <span
                        >基本账户覆盖率：{{
                            bmInfoWindow.model.baseAccountPercent
                        }}%</span
                    >
                </p>
                <p>
                    <span
                        >授信总额：{{
                            bmInfoWindow.model.creditMoney
                        }}万元</span
                    >
                </p>
                <p>
                    <span
                        >授信覆盖率：{{
                            bmInfoWindow.model.creditPercent
                        }}%</span
                    >
                </p>
                <p>
                    <span
                        >用信总额：{{ bmInfoWindow.model.loansMoney }}万元</span
                    >
                </p>
                <p>
                    <span
                        >用信覆盖率：{{
                            bmInfoWindow.model.loansPercent
                        }}%</span
                    >
                </p>
                <p>
                    <span
                        >企业网银覆盖率：{{
                            bmInfoWindow.model.ebankPercent
                        }}%</span
                    >
                </p>
                <p>
                    <span
                        >代发工资覆盖率：{{
                            bmInfoWindow.model.salaryPerCent
                        }}%</span
                    >
                </p>
                <p>
                    <span
                        >国际结算覆盖率：{{
                            bmInfoWindow.model.settlementPerCent
                        }}%</span
                    >
                </p>
                <p>
                    <span
                        >日均100万以上户数：{{
                            bmInfoWindow.model.dayMillionCount
                        }}家</span
                    >
                </p>
                <p>
                    <span
                        >日均500万以上户数：{{
                            bmInfoWindow.model.dayFiveMillionCount
                        }}家</span
                    >
                </p>
            </div>
        </div>
    </div>
</template>

<script>
// 文档  http://api.map.baidu.com/library/DrawingManager/1.4/docs/symbols/BMapLib.DrawingManager.html

import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import GeoUtils from './util'
import mix from './mix'

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: process.env.VUE_APP_BaiduMap_ak,
})
export default {
    mixins: [mix],
    components: {},
    name: 'MapStat',
    props: {
        estyearQj: {
            type: String,
            default: '1',
        },
        grid1List: {
            type: Array,
            default() {
                return []
            },
        },
        grid2List: {
            type: Array,
            default() {
                return []
            },
        },
    },
    computed: {
        isManager() {
            return this.$store.state.app.user.roleLev == '1'
        },
    },
    data() {
        return {
            myCenter: { lng: 120.686564, lat: 30.417924 },
            my_estyearQj: '',
            banks: [],
            position: {
                lng: 120.881608,
                lat: 30.51714,
            },
            bmInfoWindow: {
                loading: false,
                model: {},
                show: false,
                position: {
                    lng: 120.681608,
                    lat: 30.52714,
                },
            },
        }
    },
    watch: {
        estyearQj: {
            handler(val) {
                this.my_estyearQj = val
            },
            immediate: true,
        },
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
    mounted() {
        // console.log(1,JSON.stringify)
    },

    destroyed() {
        console.log('destroyed')
    },
    methods: {
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
                    this.level2List = []
                }
            }
        },
        // {model,position}
        onGridOver({ model, position }) {
            console.log('onGridOver', model.name, model, position)

            let { gridLevel, gridCode } = model.$model
            this.bmInfoWindow.loading = true
            this.$api
                .get_grid_analyze({
                    estyearQj: this.my_estyearQj,
                    gridLevel,
                    gridCode,
                })
                .then(({ data }) => {
                    this.bmInfoWindow.position = position
                    this.bmInfoWindow.show = true
                    this.bmInfoWindow.model = data
                    this.bmInfoWindow.loading = false
                })
                .catch(err => {
                    this.bmInfoWindow.loading = false
                })
        },
        onBoundaryOut() {
            this.bmInfoWindow.show = false
        },
        mousemove({ type, target, point, pixel, overlay }) {
            // console.log(1111, point)
            // this.bmInfoWindow.position = {
            //     ...point,
            // }
        },
        mouseout() {
            //this.bmInfoWindow.show = false
        },
        onLevel1Click({ code }) {
            //this.zoom = 13

            let level2List = this.level2Path.filter(item => {
                console.log(item.$model.pGridCode, item.code)
                return item.$model.pGridCode == code
            })

            this.level2List = this.filterPath(level2List, 2)
        },

        async handler({ BMap, map }) {
            this.isReady = true
            this.BMap = BMap
            this.map = map
            var bs = map.getBounds() //获取可视区域
            var bssw = bs.getSouthWest() //可视区域左下角
            var bsne = bs.getNorthEast() //可视区域右上角
            console.log(bs)
            console.log(
                '当前地图可视范围是：' +
                    bssw.lng +
                    ',' +
                    bssw.lat +
                    '到' +
                    bsne.lng +
                    ',' +
                    bsne.lat,
            )

            try {
                let level1List = []
                let level2List = []
                this.level1Path = await this.syncLevelPath({
                    gridLevel: 1,
                })
                this.level2Path = await this.syncLevelPath({
                    gridLevel: 2,
                })

                this.filterLevel1(this.pGridCode)
                // 假如是客户经理则显示全部
                if (this.isManager) {
                    this.level2List = [...this.level2Path]
                }
                // if (this.level === 2) {
                //     this.filterLevel2(this.gridCode)
                // }

                //this.level2List = this.filterPath(this.level2Path, 2)
            } catch (err) {
                console.error(err)
            }
        },
    },
}
</script>

<style lang="less">
.sample1 {
    height: 240px !important;
}
.map-pane-content.stat {
    width: 220px;

    line-height: 40px;
    background: rgba(0, 0, 0, 0.5);
    /* box-shadow: 0 0 5px #000; */
    color: #fff;
    text-align: left;
    padding: 10px;
    position: absolute;
    height: 240px;

    overflow-y: auto;
    left: 0;
    top: 0;
    z-index: 100;
    p {
        line-height: 18px;
        margin: 0;
        font-size: 12px;
    }
}
</style>
