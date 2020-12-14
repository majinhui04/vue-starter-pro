<template>
    <div class="baidu-map-wrap">
        <div class="baidu-map-view">
            <baidu-map
                :double-click-zoom="false"
                ref="bMap"
                :center="myCenter"
                :zoom.sync="myZoom"
                @ready="handler"
                class="bm-view"
                :scroll-wheel-zoom="scrollWheelZoom"
            >
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                <my-boundary @mouseout="onBoundaryOut"></my-boundary>

                <!-- 一级网格 -->
                <my-grid
                    :level="1"
                    :paths="level1List"
                    v-if="level1List.length"
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
                <!-- <my-company :result="query.result"></my-company> -->
                <!-- 支行 -->
                <my-bank :result="banks" v-if="banks.length"></my-bank>

                <my-overlay
                    v-if="bmInfoWindow.show"
                    :position="bmInfoWindow.position"
                    text="点击我"
                    :active="active"
                    @mouseover.native="active = true"
                    @mouseleave.native="active = false"
                >
                    <div class="map-pane-content">
                        <p>名称：{{ bmInfoWindow.model.name }}</p>
                        <p>类型：{{ bmInfoWindow.model.level }}</p>
                        <p>关联：{{ bmInfoWindow.model.branch }}</p>
                        <!-- <p>区域：-</p> -->
                        <p v-if="bmInfoWindow.model.manager">
                            经理：{{ bmInfoWindow.model.manager }}
                        </p>
                        <p>备注：{{ bmInfoWindow.model.remark }}</p>
                    </div>
                </my-overlay>
            </baidu-map>
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
    name: 'MapGrid',
    props: {
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
    data() {
        return {
            myZoom: 12,
            myCenter: { lng: 120.686564, lat: 30.417924 },
            banks: [],
            position: {
                lng: 120.881608,
                lat: 30.51714,
            },
            bmInfoWindow: {
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
            console.log('onGridOver', model.name, model)
            this.bmInfoWindow.position = position
            this.bmInfoWindow.show = true
            this.bmInfoWindow.model = model
        },
        onBoundaryOut() {
            this.bmInfoWindow.show = false
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

            try {
                this.banks = await this.$api.get_grid_banks_options()
                let level1List = []
                let level2List = []
                this.level1Path = await this.syncLevelPath({
                    gridLevel: 1,
                })
                this.level2Path = await this.syncLevelPath({
                    gridLevel: 2,
                })

                this.filterLevel1(this.pGridCode)
                if (this.level === 2) {
                    this.filterLevel2(this.gridCode)
                }

                //this.level2List = this.filterPath(this.level2Path, 2)
            } catch (err) {
                console.error(err)
            }
        },
    },
}
</script>

<style lang="less"></style>
