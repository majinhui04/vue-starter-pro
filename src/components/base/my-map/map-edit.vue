<template>
    <div class="baidu-map-wrap">
        <div class="header">
            <div class="sg-flex-1">
                <span style="display:none;">{{ target }}</span>
            </div>

            <my-menu :action.sync="action" @reset="reset" @paint="handlePaint">
                <el-button type="primary" @click="save">保存</el-button>
            </my-menu>
        </div>
        <div class="baidu-map-view">
            <!-- map -->
            <baidu-map
                ref="bMap"
                :center="mapCenter"
                :zoom="zoom"
                @ready="handler"
                class="bm-view"
                @mousemove="syncPolyline"
                @click="paint"
                @rightclick="newPolyline"
                :scroll-wheel-zoom="scrollWheelZoom"
            >
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

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
                <!-- 一级网格 -->
                <my-grid
                    :level="1"
                    :paths="level1List"
                    v-if="level1List.length"
                ></my-grid>
                <!-- 二级网格 -->
                <my-grid
                    :level="2"
                    :paths="level2List"
                    v-if="level2List.length"
                ></my-grid>
            </baidu-map>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import GeoUtils from './util'
import mix from './mix'

Vue.use(BaiduMap, {
    ak: process.env.VUE_APP_BaiduMap_ak,
})
export default {
    name: 'MapEdit',
    mixins: [mix],
    props: {
        content: '',
        level: 1, // 默认一级网格
        editing: false, // 是否是编辑模式
    },
    watch: {},
    computed: {
        // 是否是编辑某块区域
        target() {
            if (this.content) {
                let result = JSON.parse(this.content)
                let body = result.body
                let type = result.type
                if (type === 'circle') {
                    this.circlePath = {
                        ...body,
                    }
                    this.painting = true
                    this.action = '圆形'
                } else {
                    this.action = '多边形'
                    this.polygonPath = [...body]
                }

                this.result = result
                return result
            } else {
                return {}
            }
        },
        // 编辑多边形
        isEdit() {
            if (this.content) {
                return true
            } else {
                return false
            }
        },
    },
    data() {
        return {
            // 地图是否加载完毕
            isReady: false,
            // 支行120.789785,30.415624

            // 保存的数据
            result: null,
            map: null,
            BMap: null,
            //center: { lng: 116.404, lat: 39.915 },
            mapCenter: { lng: 120.686564, lat: 30.517924 },
            //mapCenter: '嘉兴市海宁市海宁市',

            // 多边形、圆
            action: '',
            polygonPath: [],
            polyline: {
                editing: false,
                paths: [],
            },
            zoom: 12,
        }
    },
    async created() {},
    mounted() {
        let _self = this
        this.$nextTick(() => {
            // if (_self.$refs.bMap) {
            //     _self.$refs.bCircleMap.$el.style.height = (window.innerHeight - 132) + 'px';
            // }
            // if(_self.$refs.viewMap){
            //     _self.$refs.viewMap.$el.style.height = (window.innerHeight - 132) + 'px';
            // }
            // // 监听窗口大小变化
            // window.addEventListener('resize', () => {
            //     if (_self.$refs.bCircleMap) {
            //         _self.$refs.bCircleMap.$el.style.height = (window.innerHeight - 132) + 'px';
            //     }
            //     if(_self.$refs.viewMap){
            //         _self.$refs.viewMap.$el.style.height = (window.innerHeight - 132) + 'px';
            //     }
            // })
        })
    },
    destroyed() {
        console.log('destroyed')
    },
    methods: {
        // 是否在父区域内 area1子 area2父
        isInParentArea(area1, area2) {
            const { BMap } = this
            let result = true
            if (area1.type === 'polygon') {
                let area1_points = area1.body.map(item => {
                    return new BMap.Point(item.lng, item.lat)
                })

                if (area2.type === 'polygon') {
                    let area2_points = area2.body.map(item => {
                        return new BMap.Point(item.lng, item.lat)
                    })
                    let area2_polygon = new BMap.Polygon(area2_points)
                    area1_points.some((point, index) => {
                        if (!GeoUtils.isPointInPolygon(point, area2_polygon)) {
                            result = false
                            return true
                        } else {
                            return false
                        }
                    })
                }
                if (area2.type === 'circle') {
                    let { center, radius } = area2.body
                    let point = new BMap.Point(center.lng, center.lat)
                    let circle = new BMap.Circle(point, radius)
                    area1_points.some(point => {
                        if (!GeoUtils.isPointInCircle(point, circle)) {
                            result = false
                            return true
                        } else {
                            return false
                        }
                    })
                }
            }
            if (area1.type === 'circle') {
                let { center, radius } = area1.body
                let area1_radius = radius
                let area1_point = new BMap.Point(center.lng, center.lat)
                let area1_circle = new BMap.Circle(area1_point, area1_radius)

                if (area2.type === 'polygon') {
                    let points = area2.body.map(element => {
                        return new BMap.Point(element.lng, element.lat)
                    })
                    points.some(point => {
                        let dis = GeoUtils.getDistance(area1_point, point)
                        if (dis < area1_radius) {
                            result = false
                            return true
                        } else {
                            return false
                        }
                    })
                }
                if (area2.type === 'circle') {
                    let { center, radius } = area2.body
                    let area2_radius = radius
                    let area2_point = new BMap.Point(center.lng, center.lat)
                    let dis = GeoUtils.getDistance(area1_point, area2_point)

                    if (dis + area2_radius > area1_radius) {
                        result = false
                    }
                }
            }
            return result
        },
        // 当前区域 area1
        isAreaOverlap(area1, area2) {
            const { BMap } = this
            let result = false
            if (area1.type === 'polygon') {
                let area1_points = area1.body.map(item => {
                    return new BMap.Point(item.lng, item.lat)
                })

                if (area2.type === 'polygon') {
                    let area2_points = area2.body.map(item => {
                        return new BMap.Point(item.lng, item.lat)
                    })
                    let area2_polygon = new BMap.Polygon(area2_points)

                    area1_points.some(point => {
                        if (GeoUtils.isPointInPolygon(point, area2_polygon)) {
                            result = true
                            return true
                        }
                    })
                }
                if (area2.type === 'circle') {
                    let { center, radius } = area2.body
                    let point = new BMap.Point(center.lng, center.lat)
                    let circle = new BMap.Circle(point, radius)
                    area1_points.some(point => {
                        if (GeoUtils.isPointInCircle(point, circle)) {
                            result = true
                            return true
                        }
                    })
                }
            }
            if (area1.type === 'circle') {
                let { center, radius } = area1.body
                let area1_radius = radius
                let area1_point = new BMap.Point(center.lng, center.lat)
                let area1_circle = new BMap.Circle(area1_point, area1_radius)

                if (area2.type === 'polygon') {
                    let points = area2.body.map(element => {
                        return new BMap.Point(element.lng, element.lat)
                    })
                    points.some(point => {
                        if (GeoUtils.isPointInCircle(point, area1_circle)) {
                            result = true
                            return true
                        }
                    })
                }
                if (area2.type === 'circle') {
                    let { center, radius } = area2.body
                    let area2_radius = radius
                    let area2_point = new BMap.Point(center.lng, center.lat)
                    let dis = GeoUtils.getDistance(area1_point, area2_point)

                    if (dis <= area1_radius + area2_radius) {
                        result = true
                    }
                }
            }

            return result
        },
        validateCheckLevel1Overlap() {
            const { BMap, result, level1List } = this
            let area1 = {
                ...result,
            }
            let valid = true
            level1List.some(item => {
                let { content } = item
                if (content) {
                    try {
                        let area2 = JSON.parse(content)
                        if (this.isAreaOverlap(area1, area2)) {
                            valid = false
                            return true
                        }
                    } catch (err) {
                        console.error(err)
                        return false
                    }
                }
            })
            return valid
        },
        validateCheckLevel2Overlap() {
            const { BMap, result, level2List } = this
            let area1 = {
                ...result,
            }
            let valid = true
            level2List.some(item => {
                let { content } = item
                if (content) {
                    try {
                        let area2 = JSON.parse(content)
                        if (this.isAreaOverlap(area1, area2)) {
                            valid = false
                            return true
                        }
                    } catch (err) {
                        console.error(err)
                        return false
                    }
                }
            })
            return valid
        },

        // 判断子域在父区域内 area1 子 area2 父区域
        validateLevel2InParent() {
            let { level1List, result } = this
            let valid = true
            let { content } = level1List[0]

            try {
                let area1 = {
                    ...result,
                }
                let area2 = JSON.parse(content)
                if (!this.isInParentArea(area1, area2)) {
                    valid = false
                }
            } catch (err) {
                console.error(err)
            }

            return valid
        },
        validate() {
            const { level } = this
            return new Promise((resolve, reject) => {
                if (level == 1) {
                    let valid = this.validateCheckLevel1Overlap()
                    if (valid) {
                        resolve()
                    } else {
                        reject({
                            message: '重合',
                            name: 'overlap',
                        })
                    }
                } else if (level == 2) {
                    if (!this.validateLevel2InParent()) {
                        return reject({
                            message: '不在父区内',
                            name: 'out',
                        })
                    }
                    if (!this.validateCheckLevel2Overlap()) {
                        return reject({
                            message: '重合',
                            name: 'overlap',
                        })
                    }
                    resolve()
                } else {
                    resolve()
                }
            })
        },
        // 重绘
        reset() {
            console.log('reset')

            this.result = null
            this.painting = false
            this.action = ''
            this.polyline.paths = []
            this.polygonPath = []
        },

        save() {
            console.log('save', this.result)
            if (this.result) {
                this.validate()
                    .then(res => {
                        this.$emit('success', this.result)
                    })
                    .catch(res => {
                        if (res.name === 'overlap') {
                            // this.$message.error(
                            //     '当前网格与其他网格有重合，请重新编辑',
                            // )
                            // this.$confirm(
                            //     '当前网格与其他网格有重合，确定吗?',
                            //     '提示',
                            //     {
                            //         confirmButtonText: '确定',
                            //         cancelButtonText: '取消',
                            //         type: 'warning',
                            //     },
                            // ).then(() => {
                            //     this.$emit('success', this.result)
                            // })
                            this.$emit('success', this.result)
                        }
                        if (res.name === 'out') {
                            this.$message.error('当前区域不在一级网格内')
                        }
                    })
            } else {
                this.$message.warning('请选择区域')
            }
        },

        handleOverGrid({ type, target, point, pixel }) {
            // const level1Path = this.level1Path
            // let result = null
            // level1Path.forEach(item => {})
            // console.log(12, { type, target, point, pixel })
        },
        async handler({ BMap, map }) {
            this.isReady = true
            this.BMap = BMap
            this.map = map
            //console.log(BMap, map)
            // let area1 = {
            //     type: 'polygon',
            //     body: [
            //         { lng: 120.694613, lat: 30.604996 },
            //         { lng: 120.756129, lat: 30.581121 },
            //         { lng: 120.688289, lat: 30.544303 },
            //     ],
            // }
            // let area2 = {
            //     type: 'polygon',
            //     body: [
            //         { lng: 120.683689, lat: 30.574654 },
            //         { lng: 120.746355, lat: 30.535842 },
            //         { lng: 120.744056, lat: 30.487057 },
            //         { lng: 120.667017, lat: 30.442232 },
            //         { lng: 120.568131, lat: 30.44273 },
            //         { lng: 120.539961, lat: 30.461161 },
            //     ],
            // }
            // let result = this.isAreaOverlap(area1, area2)
            // console.log(123456732, result)

            try {
                let level1List = []
                let level2List = []
                this.level1Path = await this.syncLevelPath({
                    gridLevel: 1,
                })
                this.level2Path = await this.syncLevelPath({
                    gridLevel: 2,
                    pGridCode: this.pGridCode,
                })
                if (this.level === 1) {
                    let code = this.code
                    console.log('code', code)
                    // this.level1List = this.level1Path.filter(item => {
                    //     console.log(item.code, code, item.code !== code)
                    //     return item.code !== code
                    // })
                    this.level1List = this.level1Path.filter(
                        item => item.code !== code,
                    )
                }
                if (this.level === 2) {
                    let code = this.code
                    let pGridCode = this.pGridCode
                    this.level1List = this.level1Path.filter(item => {
                        return item.code === pGridCode
                    })
                    this.level2List = this.level2Path.filter(item => {
                        return (
                            item.$model.pGridCode === pGridCode &&
                            item.code !== code
                        )
                    })
                }
                // this.level1List = this.filterPath(this.level1Path, 1)
                // this.level2List = this.filterPath(this.level2Path, 2)

                console.log('this.level1List', this.level1List)
                console.log('this.level2List', this.level2List)
            } catch (err) {
                console.error(err)
            }
        },
    },
}
</script>

<style lang="less"></style>
