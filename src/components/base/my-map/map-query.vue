<template>
    <div class="baidu-map-wrap" v-loading.fullscreen.lock="!isReady">
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
            <!-- 工具 -->
            <my-menu :action.sync="action" @reset="reset" @paint="handlePaint">
                <el-button type="primary" @click="save">搜索</el-button>
                <!-- <el-button type="primary" @click="handleTest">测试点</el-button> -->
            </my-menu>
        </div>

        <div class="baidu-map-view">
            <!-- map -->
            <baidu-map
                ref="bMap"
                :center="mapCenter"
                :zoom="myZoom"
                @ready="handler"
                class="bm-view"
                @mousemove="syncPolyline"
                @click="paint"
                @rightclick="newPolyline"
                :scroll-wheel-zoom="scrollWheelZoom"
            >
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                <!-- 行政区 -->
                <my-boundary></my-boundary>
                <!-- 编辑网格 -->
                <my-edit
                    :painting="painting"
                    :action="action"
                    :result.sync="result"
                    :polygonPath="polygonPath"
                    :circlePath="circlePath"
                    :polyline="polyline"
                ></my-edit>
                <my-result
                    :pagination="query.pagination"
                    :result="query.result"
                    :model="currentBank"
                    :visible.sync="query.visible"
                    @save="handleSaveAll"
                    @page="onPageChange"
                    @reset="onBankReset"
                    @open="onCompanyOpen"
                    :load="query.load"
                ></my-result>
                <!-- <console-dialog
                    :visible.sync="TestView.visible"
                ></console-dialog> -->
                <!-- 支行 -->
                <my-bank
                    v-if="banks.length"
                    :result="banks"
                    @click="handleBankClick"
                ></my-bank>
                <!-- <my-companys
                    :hasAction="true"
                    @save="handleSaveOne"
                    :result="query.resultAll"
                ></my-companys> -->
                <!-- 公司信息 -->
                <my-company-info
                    ref="companyRef"
                    :hasAction="true"
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
                <bm-marker
                    :icon="{
                        url: '/static/img/blue.png',
                        size: { width: 23, height: 25 },
                    }"
                    :position="{
                        lng: 120.42774989574846,
                        lat: 30.390923998143255,
                    }"
                >
                </bm-marker>
                <!-- 海量点 -->
                <!-- <bm-point-collection
                    :points="points"
                    shape="BMAP_POINT_SHAPE_STAR"
                    color="red"
                    size="BMAP_POINT_SIZE_SMALL"
                    @click="clickHandler"
                ></bm-point-collection> -->
                <!-- <my-companys
                    :hasAction="true"
                    @save="handleSaveOne"
                    :result="TestView.points"
                ></my-companys> -->
            </baidu-map>
            <!-- <canvas id="canvas"></canvas> -->
        </div>
        <company-save-dialog
            type="es"
            :meta="pDialog.meta"
            @success="onCompanySaveSuccess"
            :visible.sync="pDialog.visible"
            v-if="pDialog.visible"
        >
        </company-save-dialog>
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

function generateUUID() {
    var d = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
        c,
    ) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return uuid
}
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: process.env.VUE_APP_BaiduMap_ak,
})
export default {
    mixins: [mix],
    components: {
        //BmlMarkerClusterer,
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
            TestView: {
                visible: true,
                result: {}, // 统计结果
                query: {},
                points: [],
            },
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
                visible: false, // 查询结果显示
                result: [], // 查询结果
                resultAll: [],
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
            points: [
                // {
                //     lng: 120.67472800584729,
                //     lat: 30.55833893061587,
                // },
                // {
                //     lng: 120.50184363078843,
                //     lat: 30.43977726204149,
                // },
                // {
                //     lng: 120.6740225647337,
                //     lat: 30.52336940058811,
                // },
            ],
            mapvLayer: {},
        }
    },
    watch: {},
    async created() {
        //this.addPoints()
    },

    methods: {
        addPoints() {
            const { map } = this
            const points = []
            let lng = 120.50184363078843
            let lat = 30.43977726204149
            let yellowIcon = document.createElement('img')
            yellowIcon.src = require('@/assets/images/map/yellow.png')
            for (var i = 0; i < 1000; i++) {
                const position = {
                    geometry: {
                        type: 'Point',
                        coordinates: [lng + Math.random(), Math.random() + lat],
                    },
                    icon: yellowIcon,
                    order: i,
                    data: { name: i },
                    tag: 'green',
                }
                points.push(position)
            }
            var dataSet = new mapv.DataSet(points)
            const that = this
            var options = {
                draw: 'icon',
                methods: {
                    // 默认鼠标进入图标显示信息栏  单击图标与信息栏以外区域隐藏信息栏
                    // 初始点击一次图标 锁定信息栏 再次点击图标 解锁信息栏
                    // 之后双击图标锁定信息栏  单击 解锁信息栏

                    click: m => {
                        console.log(m)

                        // if (m && that.showicon[m.tag] && that.showicon.flag) {
                        //     that.showicon.order = m.order
                        //     that.pointDetail = m.data
                        //     that.pointBox.lng = m.geometry.coordinates[0]
                        //     that.pointBox.lat = m.geometry.coordinates[1]
                        //     that.show = true
                        //     if (that.show && that.$refs.customOverlay) {
                        //         that.$refs.customOverlay.reload()
                        //     }
                        // }
                    },
                },
            }
            var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)
            // this.mapvLayer["redLayerLayer"].hide();
        },
        addCompanyPoints() {
            console.log('addCompanyPoints')
            const points = []
            let limit = 10
            let count = 0
            let lng = 120.50184363078843
            let lat = 30.43977726204149
            for (var i = 0; i < 100; i++) {
                const position = {
                    $url: '/static/img/green.png',
                    $title: Math.random() + '111',
                    $tags: '',
                    longitude: lng + Math.random(),
                    latitude: Math.random() + lat,
                }
                points.push(position)
            }
            this.TestView.points = points
        },
        clickHandler(e) {
            console.log(e.point)
            alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`)
        },

        // 保存一个公司
        handleSaveOne(target) {
            const selected = [target.pripid]

            this.pDialog.meta = {
                pripids: [...selected],
            }
            this.pDialog.visible = true
        },
        // onBankReset
        onBankReset() {
            this.currentBank = {}
            this.result = {}
            this.handleSearch()
        },
        // 选中银行 {"type":"circle","body":{"radius":6340.436633919243,"center":{"lng":120.733132,"lat":30.467635}}}
        async handleBankClick(target) {
            console.log('handleBankClick', target)

            this.reset()

            this.currentBank = {
                ...target,
            }
            this.result = {
                type: 'circle',
                body: { radius: 3000, center: target.$position },
            }
            this.handleSearch()
        },
        // 获取银行
        async syncBanks() {
            const result = await this.$api.get_grid_banks_options()

            this.banks = [...result.filter(item => item.$model.$position)]
            console.log('this.banks', this.banks)
        },
        // 保存所有
        handleSaveAll(val) {
            const { result, model } = this.query
            if (val && val.length) {
                this.pDialog.meta = {
                    pripids: [...val],
                }
                this.pDialog.visible = true
            } else {
                const content =
                    this.result && Object.keys(this.result).length
                        ? JSON.stringify(this.result)
                        : ''
                this.pDialog.meta = {
                    params: {
                        content,
                        ...this.model,
                    },
                }
                this.pDialog.visible = true
            }
        },

        // 菜单顶部查询
        onQuerySubmit(query) {
            console.log('onQuerySubmit', query)
            this.handleSearch({
                page: 1,
                ...query,
            })
        },

        // 点击企业
        handleMarkerClick(target) {
            const { entName, latitude, longitude } = target

            this.current = {
                title: entName,
                lng: longitude,
                lat: latitude,
                show: true,
            }
            console.log(target, JSON.stringify(this.current))
        },
        // 分页查询
        async handleSearch(params = {}) {
            const { model } = this.query
            this.query.visible = true
            const content =
                this.result && Object.keys(this.result).length
                    ? JSON.stringify(this.result)
                    : ''
            params = {
                pageNumber: 1,
                pageSize: 100,
                ...model,
                ...params,
                content,
            }
            // 启动计时器
            console.time('testForEach')
            let pageNumber = params.page || 1
            let { data: result } = await this.$api.get_grid_list_es({
                ...params,
                pageNumber,
            })
            let { data, total } = result

            // 停止计时，输出时间
            console.timeEnd('testForEach')
            console.log('handleSearch', data)
            this.handleProcessCompany(data)
            this.query.result = data
            this.query.resultAll = data
            this.query.pagination = {
                page: pageNumber,
                limit: 100,
                total: total,
            }
        },
        // // 全部查询
        // async handleSearch(params = {}) {
        //     const { model } = this.query
        //     const content =
        //         this.result && Object.keys(this.result).length
        //             ? JSON.stringify(this.result)
        //             : ''
        //     params = {
        //         pageNumber: 1,
        //         pageSize: 10000,
        //         ...model,
        //         ...params,
        //         content,
        //     }
        //     // 启动计时器
        //     console.time('testForEach')
        //     let pageNumber = params.page || 1
        //     let { data: result } = await this.$api.get_grid_list_es({
        //         ...params,
        //     })

        //     // 停止计时，输出时间
        //     console.timeEnd('testForEach')
        //     this.query.result = result.data.slice(0, 10)
        //     this.query.resultAll = result.data
        //     this.query.pagination = {
        //         page: 1,
        //         limit: 10,
        //         total: result.data.length,
        //     }
        // },
        // 测试一下
        async handleTest() {},
        // 分批查询
        // async handleSearch(params = {}) {
        //     const { model } = this.query
        //     const content =
        //         this.result && Object.keys(this.result).length
        //             ? JSON.stringify(this.result)
        //             : ''
        //     params = {
        //         pageNumber: 1,
        //         pageSize: 1,
        //         ...model,
        //         ...params,
        //         content,
        //     }
        //     // 启动计时器
        //     console.time('testForEach')
        //     let pageNumber = params.page || 1
        //     let { data: result } = await this.$api.get_grid_list_es({
        //         ...params,
        //     })
        //     let { data, total } = result
        //     let pageSize = 2000
        //     let pages = Math.ceil(total / pageSize)
        //     let list = Array.from({ length: pages }).map((item, index) => {
        //         return {
        //             ...params,
        //             pageNumber: index + 1,
        //             pageSize: pageSize,
        //         }
        //     })
        //     console.log(`并发总数:${pages}  请求总数:${list.length}`)
        //     let res = []
        //     console.time('concurrency')
        //     await this.$utils.concurrency(
        //         list,
        //         async (item, index) => {
        //             return new Promise(async (resolve, reject) => {
        //                 try {
        //                     let {
        //                         data: result,
        //                     } = await this.$api.get_grid_list_es(
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
        //     console.timeEnd('concurrency')

        //     this.query.result = res.slice(0, 10)
        //     this.query.resultAll = res
        //     this.query.pagination = {
        //         page: 1,
        //         limit: 10,
        //         total: res.length,
        //     }
        //     // 停止计时，输出时间
        //     console.timeEnd('testForEach')
        //     console.log('handleSearch', this.query.pagination)
        // },
        // onPageChange({ page }) {
        //     console.log('onPageChange', page)
        //     let { result, resultAll } = this.query
        //     let start = (page - 1) * 10
        //     let end = start + 10
        //     this.query.result = resultAll.slice(start, end)
        //     this.handleSearch({ page })
        // },
        onPageChange({ page }) {
            console.log('onPageChange', page)
            this.handleSearch({ page })
        },

        // 重置查询条件
        reset() {
            console.log('reset')
            this.result = null
            this.painting = false
            this.action = ''
            this.polyline.paths = []
            this.polygonPath = []
        },

        //
        save() {
            if (this.result) {
                // 清空银行
                this.currentBank = {}
                this.handleSearch()
                this.$emit('success', this.result)
            } else {
                this.$message.warning('请选择区域')
            }
        },

        addPoints2() {
            const mapv = window.mapv
            const { BMap, map } = this
            console.log(1234567, map.enableScrollWheelZoom, BMap, map)
            var randomCount = 300

            var data = []

            var citys = [
                '北京',
                '天津',
                '上海',
                '重庆',
                '石家庄',
                '太原',
                '呼和浩特',
                '哈尔滨',
                '长春',
                '沈阳',
                '济南',
                '南京',
                '合肥',
                '杭州',
                '南昌',
                '福州',
                '郑州',
                '武汉',
                '长沙',
                '广州',
                '南宁',
                '西安',
                '银川',
                '兰州',
                '西宁',
                '乌鲁木齐',
                '成都',
                '贵阳',
                '昆明',
                '拉萨',
                '海口',
            ]

            // 构造数据
            while (randomCount--) {
                var cityCenter = mapv.utilCityCenter.getCenterByCityName(
                    citys[parseInt(Math.random() * citys.length)],
                )
                data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [
                            cityCenter.lng - 2 + Math.random() * 4,
                            cityCenter.lat - 2 + Math.random() * 4,
                        ],
                    },
                    count: 30 * Math.random(),
                })
            }

            var dataSet = new mapv.DataSet(data)

            var options = {
                fillStyle: 'rgba(255, 50, 50, 0.6)',
                shadowColor: 'rgba(255, 50, 50, 1)',
                shadowBlur: 30,
                globalCompositeOperation: 'lighter',
                methods: {
                    click: function(item) {
                        console.log(item)
                    },
                },
                size: 5,
                // updateImmediate: true,
                draw: 'simple',
            }

            var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)
        },
        async handler({ BMap, map }) {
            this.isReady = true
            this.BMap = BMap
            this.map = map

            try {
                this.syncBanks()
                //this.addPoints2()
                //this.handleSearch()
                //this.addCompanyPoints()
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
        overflow: hidden;
        white-space: nowrap;
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
