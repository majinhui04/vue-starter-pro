<template>
    <div class="my-page DemoMapv">
        <div class="content">
            <baidu-map
                class="bm-view"
                :center="center"
                :zoom="zoom"
                :map-style="mapStyle"
                @ready="handler"
            ></baidu-map>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
    ak: process.env.VUE_APP_BaiduMap_ak,
})
export default {
    components: {},
    name: 'Mapv',
    data() {
        return {
            center: { lng: 0, lat: 0 },
            zoom: 10,
            mapStyle: { style: 'dark' },
        }
    },
    watch: {},
    mounted() {
        // console.log(mapv.OpenlayersLayer, mapv.DataSet, mapv.utilCityCenter)
    },
    methods: {
        handler({ BMap, map }) {
            var mapv = window.mapv
            map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
            console.log(BMap, map)
            this.center.lng = 105.403119
            this.center.lat = 38.028658
            this.zoom = 5
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
            // console.log(dataSet);
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
                draw: 'simple',
            }
            console.log('hello')
            // eslint-disable-next-line new-cap
            var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)
            console.log('hello2')

            mapvLayer.show() // 显示图层
        },
    },
}
</script>

<style lang="less">
.DemoMapv {
    height: 100%;
    width: 100%;
    .content {
        height: 100%;
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        .bm-view {
            width: 100%;
            height: 81vh;
        }
    }
}
</style>
