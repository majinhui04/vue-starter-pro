import MyBoundary from './MyBoundary'
import MyMenu from './MyMenu.vue'
import MyEdit from './MyEdit.vue'
import MyGrid from './MyGrid.vue'
import MyBank from './MyBank.vue'
import MyOverlay from './MyOverlay.vue'
import MyCompanys from './MyCompanys.vue'
import MyCompanyInfo from './MyCompanyInfo'
import MyPoint from './MyPoint'
export default {
    components: {
        MyBoundary,
        MyMenu,
        MyGrid,
        MyEdit,
        MyBank,
        MyOverlay,
        MyCompanys,
        MyCompanyInfo,
        MyPoint,
    },
    props: {
        scrollWheelZoom: {
            type: Boolean,
            default: process.env.VUE_APP_ENV === 'dev' ? false : true,
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
        code: {
            type: String,
            default: '',
        },
        //
        gridCode: {
            type: String,
            default: '',
        },
        pGridCode: {
            type: String,
            default: '',
        },
        // 显示的网格code
        includes: {
            type: Array,
            default() {
                return []
            },
        },
        excludes: {
            type: Array,
            default() {
                return []
            },
        },
        level: {
            type: Number,
            default: 1,
        },
        // 模式
        mode: {
            type: String,
            default: '',
        },
        // 当前网格对象
        model: {
            type: Object,
            default: {
                code: '',
            },
        },
        // 额外参数
        meta: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            companyInfo: {
                visible: false,
                result: [], // 公司列表
                points: [], //点
                position: {},
                map: {},
                target: null,
            },
            myGrid1List: [],
            myGrid2List: [],
            zoom: 12,
            painting: false,
            action: '',
            // 地图是否加载完毕
            isReady: false,
            // mapCenter: { lng: 120.686564, lat: 30.517924 },
            mapCenter: { lng: 120.686564, lat: 30.417924 },
            // 绘图
            polygonPath: [],
            circlePath: {
                center: {
                    lng: 120.686564,
                    lat: 30.517924,
                },
                // radius: 1000,
                // center: {
                //     lng: 116.404,
                //     lat: 39.915,
                // },
                radius: 3000,
            },
            polyline: {
                editing: false,
                paths: [],
            },

            level2List: [], // 显示的二级
            level2Path: [], // 所有二级
            level1List: [], // 显示的一级
            level1Path: [], // 所有一级
            BMap: null,
            map: null,
        }
    },
    methods: {
        // 显示公司
        onCompanyOpen(model) {
            this.companyInfo.position = {
                lat: model.latitude,
                lng: model.longitude,
            }
            this.companyInfo.result = [{ ...model }]
            this.companyInfo.visible = true
        },
        // 点击点
        onPointOpen(marker) {
            let { lat, lng } = marker
            let key = [lat, lng].join(',')
            let map = this.companyInfo.map
            let target = map[key]
            let result = target.result
            if (target) {
                this.companyInfo.position = {
                    lat,
                    lng,
                }
                this.companyInfo.result = result
                this.companyInfo.visible = true
            }
        },
        // 整理公司
        handleProcessCompany(data = []) {
            let { map } = this.companyInfo

            data.forEach(element => {
                let { longitude, latitude } = element
                if (longitude && latitude) {
                    let lat = latitude * 1
                    let lng = longitude * 1
                    let key = [lat, lng].join(',')
                    if (map[key]) {
                        map[key]['result'].push(element)
                    } else {
                        map[key] = {}
                        map[key]['url'] = element.$url

                        map[key]['lat'] = lat
                        map[key]['lng'] = lng
                        map[key]['result'] = [element]
                    }
                }
            })

            this.companyInfo.points = Object.keys(map).map(key => {
                let target = map[key]
                let { url, lat, lng } = target
                return {
                    url,
                    lng,
                    lat,
                }
            })
        },
        filterPath(paths, level = 1) {
            let result = []
            let { includes, excludes, pGridCode } = this
            let _includes = includes
                .filter(item => item.level === level)
                .map(item => item.code)
            let _excludes = excludes
                .filter(item => item.level === level)
                .map(item => item.code)

            //console.log(level, 23456, _includes, _excludes)
            if (!_includes.length) {
                result = [...paths]
            } else {
                result = paths.filter(item => {
                    const { code } = item

                    return _includes.indexOf(code) > -1
                })
            }

            if (_excludes.length) {
                result = result.filter(item => {
                    const { code } = item
                    return _excludes.indexOf(code) === -1
                })
            }
            // 如果是二级并且传了父级
            // if (level === 2 && pGridCode) {
            //     result = result.filter(
            //         item => item.$model.pGridCode === pGridCode,
            //     )
            // }

            return result
        },
        // 选择绘制模式
        handlePaint(action) {
            console.log(this.action, 1, action)
            this.action = action
            if (action === '多边形') {
                this.painting = false
                if (this.polyline.paths.length === 0) {
                    this.polyline.editing = true
                }
            }
            // console.log(111, action)
        },
        // 点击开始绘画
        paint(e) {
            const action = this.action

            if (action === '圆形') {
                if (this.painting) {
                    return
                }
                const point = e.point
                this.circlePath.center = {
                    ...point,
                }
                this.painting = true
                this.result = {
                    type: 'circle',
                    body: {
                        radius: this.circlePath.radius,
                        center: {
                            ...point,
                        },
                    },
                }
            } else if (action === '多边形') {
                this.paintPolyline(e)
            }
        },
        // 绘制多边形的点
        paintPolyline(e) {
            //console.log('绘制多边形的点', this.polyline)
            if (!this.polyline.editing) {
                return
            }
            const { paths } = this.polyline
            !paths.length && paths.push([])
            paths[paths.length - 1].push(e.point)
        },
        syncPolyline(e) {
            if (!this.polyline.editing) {
                return
            }
            const { paths } = this.polyline
            if (!paths.length) {
                return
            }
            const path = paths[paths.length - 1]
            if (!path.length) {
                return
            }
            if (path.length === 1) {
                path.push(e.point)
            }
            this.$set(path, path.length - 1, e.point)
        },
        // 完成多边形的绘制
        newPolyline(e) {
            if (!this.polyline.editing) {
                return
            }
            const { paths } = this.polyline
            if (!paths.length) {
                paths.push([])
            }
            const path = paths[paths.length - 1]
            path.pop()
            if (path.length) {
                paths.push([])
            }
            this.polyline.editing = false
            this.$message.success('绘制完成')

            // 完成后可编辑
            this.polygonPath = [...paths[0]]
            this.result = {
                type: 'polygon',
                body: paths[0],
            }
        },
        filterGridPath(list) {
            return list
                .filter(item => item.content)
                .map(item => {
                    try {
                        let result = JSON.parse(item.content)
                        if (result.type === 'polygon') {
                            let points = result.body.map(item => {
                                return new BMap.Point(item.lng, item.lat)
                            })
                            //
                            result.target = new BMap.Polygon(points)
                        }
                        if (result.type === 'circle') {
                            let body = result.body
                            let center = body.center
                            var mPoint = new BMap.Point(center.lng, center.lat)
                            result.target = new BMap.Circle(mPoint, body.radius)
                        }
                        if (!result.type) {
                            return null
                        }
                        let data = {
                            show: true,
                            id: item.id,
                            code: item.gridCode,
                            name: item.gridName,
                            type: result.type,
                            level:
                                item.gridLevel == 1 ? '一级网格' : '二级网格',
                            branch:
                                item.gridLevel == 1
                                    ? item.ownerName
                                    : item.pOwnerName,
                            content: item.content,
                            manager: item.gridLevel == 1 ? '' : item.ownerName,
                            remark: item.remark,
                            body: result.body,
                            target: result.target,
                            $model: item,
                            $map: {
                                fillColor: '#ffffff',
                                $fillColor: '#ffffff',
                                $strokeColor:
                                    item.gridLevel == 1 ? 'blue' : 'red',
                                strokeColor:
                                    item.gridLevel == 1 ? 'blue' : 'red',
                            },
                        }

                        return data
                    } catch (err) {
                        console.log(err)
                        return null
                    }
                })
                .filter(item => item)
        },
        // 获取网格 百度初始话后
        async syncLevelPath(params = {}) {
            const BMap = this.BMap
            try {
                const { data } = await this.$api.get_grid_list({
                    pageNumber: 1,
                    pageSize: 100,
                    ...params,
                })
                return this.filterGridPath(data.data)
            } catch (err) {
                console.error(err)
                return []
            }
        },
    },
    watch: {
        // grid2List: {
        //     handler(val) {
        //         this.myGrid2List = this.filterGridPath(val)
        //     },
        //     immediate: true,
        // },
        // grid1List: {
        //     handler(val) {
        //         this.myGrid1List = this.filterGridPath(val)
        //         console.log(11111, this.myGrid1List, val)
        //     },
        //     immediate: true,
        // },
    },
}
