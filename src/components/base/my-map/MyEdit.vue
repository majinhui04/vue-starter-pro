<template>
    <bm-control>
        <template v-if="action === '圆形'">
            <bm-circle
                v-if="isPaintCircle"
                :center="circlePath.center"
                :radius="circlePath.radius"
                stroke-color="blue"
                :stroke-opacity="0.5"
                :stroke-weight="2"
                @lineupdate="updateCirclePath"
                :editing="true"
            ></bm-circle>
        </template>
        <template v-if="action === '多边形'">
            <template v-if="!polyline.editing">
                <bm-polygon
                    :path="myPolygonPath"
                    stroke-color="blue"
                    :stroke-opacity="0.5"
                    :stroke-weight="2"
                    :editing="true"
                    @lineupdate="updatePolygonPath"
                />
                <!-- <template v-for="marker of myPolygonPath">
                    <bm-marker
                        :icon="{
                            url: '/static/img/clear.png',
                            size: { width: 12, height: 12 },
                        }"
                        :key="[marker.lng, marker.lat].join(',')"
                        :position="{
                            lng: marker.lng,
                            lat: marker.lat,
                        }"
                        @click="handleClear(marker)"
                    ></bm-marker>
                </template> -->
            </template>

            <template v-else>
                <bm-polyline
                    :path="path"
                    :key="index"
                    v-for="(path, index) in polyline.paths"
                ></bm-polyline>
            </template>
        </template>
    </bm-control>
</template>

<script>
export default {
    props: [
        'result',
        'action',
        'painting',
        'circlePath',
        'polyline',
        'polygonPath',
    ],
    data() {
        return {
            isPaintCircle: false,
            myPolygonPath: [],
        }
    },
    computed: {
        // myPolygonPath: {
        //     get() {
        //         // 最多取样30个点
        //         let samples = 200
        //         if (this.polygonPath && this.polygonPath.length / samples > 2) {
        //             let pageSize = Math.ceil(this.polygonPath.length / samples)
        //             let total = this.polygonPath.length
        //             let pages = Math.ceil(total / pageSize)
        //             let list = Array.from({ length: pages }).map(
        //                 (item, index) => {
        //                     return {
        //                         page: index,
        //                         pageSize: pageSize,
        //                     }
        //                 },
        //             )
        //             let result = list.map(({ page, pageSize }) => {
        //                 return this.polygonPath[page * pageSize]
        //             })
        //             console.log(1234, result)
        //             return result
        //         } else {
        //             return this.polygonPath
        //         }
        //     },
        //     set(newValue) {
        //         console.log('调用了settter属性', newValue)
        //     },
        // },
    },
    watch: {
        polygonPath: {
            handler() {
                let samples = 200
                if (this.polygonPath && this.polygonPath.length / samples > 3) {
                    let pageSize = Math.ceil(this.polygonPath.length / samples)
                    let total = this.polygonPath.length
                    let pages = Math.ceil(total / pageSize)
                    let list = Array.from({ length: pages }).map(
                        (item, index) => {
                            return {
                                page: index,
                                pageSize: pageSize,
                            }
                        },
                    )
                    let result = list.map(({ page, pageSize }) => {
                        return this.polygonPath[page * pageSize]
                    })

                    this.myPolygonPath = result
                    //return result
                } else {
                    this.myPolygonPath = [...this.polygonPath]
                    //return this.polygonPath
                }
            },
            immediate: true,
        },
        painting: {
            handler(val) {
                this.isPaintCircle = val
            },
            immediate: true,
        },
    },
    mounted() {},
    methods: {
        clear() {
            this.myPolygonPath.splice(0, 1)
        },
        handleClear(marker) {
            console.log(
                'handleClear',
                JSON.stringify(marker),
                this.myPolygonPath,
                this.myPolygonPath.length,
            )
            let match = -1
            this.myPolygonPath.forEach((item, index) => {
                if (item.lat == marker.lat && item.lng == marker.lng) {
                    console.log('match', index)
                    match = index
                }
            })
            if (match > -1) {
                this.myPolygonPath.splice(match, 1)
                console.log(111, this.myPolygonPath.length)
            }
        },
        handleDbClick({ type, target, point, pixel }) {
            let polygonPath = e.target.getPath()
            console.log(1, point)
            if (polygonPath.indexOf(point) > -1) {
                console.log('存在')
            } else {
                console.log('不存在')
            }
        },
        updatePolygonPath(e) {
            //this.polygonPath = e.target.getPath()
            let polygonPath = e.target.getPath()
            console.log('updatePolygonPath', polygonPath)
            this.result = {
                type: 'polygon',
                body: [...polygonPath],
            }
            this.$emit('update:result', this.result)
        },
        // 圆形区域
        updateCirclePath(e) {
            let radius = e.target.getRadius() //获取圆半径（单位米，可利用BMapLib.DistanceTool工具自定义单位）
            let center = e.target.getCenter() //获取圆心坐标
            let bounds = e.target.getBounds().getNorthEast() //获取圆可视范围东北角坐标
            // console.log(radius, center, bounds)
            this.result = {
                type: 'circle',
                body: {
                    radius,
                    center,
                    //bounds,
                },
            }
            this.$emit('update:result', this.result)
            //this.$emit('update', result)
        },
    },
}
</script>
