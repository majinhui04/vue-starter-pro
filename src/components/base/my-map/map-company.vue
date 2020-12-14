<template>
    <div class="baidu-map-wrap">
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

                <my-company
                    v-if="meta.result.length"
                    :result="meta.result"
                    :hasAction="false"
                ></my-company>
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
    props: {},
    data() {
        return {
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
        async handler({ BMap, map }) {
            this.isReady = true
            this.BMap = BMap
            this.map = map
            let company = this.meta.result[0]
            this.mapCenter = { lng: company.longitude, lat: company.latitude }
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
        b {
        }

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
    .query-bar {
        display: flex;
        align-items: center;
        height: 100%;
        .query-item {
            height: 100%;
            padding: 10px 20px;
            color: #333;
            font-size: 16px;
            margin-right: 12px;
            cursor: pointer;
            &.active {
                background: #fff;
            }
        }
    }
    .result {
        width: 340px;
        position: absolute;
        left: 0;
        height: 100%;
        top: 0;
        background-color: #fff;
        border: 1px solid #ddd;
        border-top: none;
        border-bottom: none;
        line-height: 1.2;

        font-size: 12px;
        transition: all 0.3s;
        &.close {
            transform: translateX(-100%);
        }
        .result-collpse {
            width: 30px;
            height: 80px;
            position: absolute;
            right: -30px;
            top: 50%;
            background: #fff;
            transform: translateY(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            cursor: pointer;
        }

        .result-list {
            padding-left: 20px;
        }
        .result-head {
            padding: 12px;
            height: 100px;
            border-bottom: 1px solid #ddd;
            overflow: hidden;
        }
        .result-marker {
            position: absolute;
            left: -15px;
            top: 7px;
        }
        .result-main {
            height: calc(100% - 200px);
            overflow-y: auto;

            .result-item {
                position: relative;
                margin-bottom: 12px;
                padding: 12px;
            }

            .result-item-head-line {
                font-size: 14px;
                font-weight: bold;
                .title {
                    margin-right: 7px;
                }
            }
        }
        .result-checkbox {
            position: absolute;
            left: -15px;
            top: 54px;
        }

        .result-foot {
            border-top: 1px solid #ddd;
            height: 100px;

            overflow: hidden;
        }
    }
}
</style>
