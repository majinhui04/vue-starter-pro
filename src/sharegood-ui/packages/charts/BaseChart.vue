<template>
    <div ref="chart" class="content" :style="[myStyle, chartStyle]"></div>
</template>
<script>
import echarts from 'echarts'

export default {
    name: 'SgBaseChart',
    props: {
        // 自定义样式
        chartStyle: {
            type: Object,
            default() {
                return {}
            },
        },
        /// 默认配置
        option: {
            type: Object,
            default() {
                return {}
            },
        },
        // 合并配置
        getOption: {
            type: Function,
            default(option = {}, config = {}) {
                return {
                    ...option,
                    ...config,
                }
            },
        },
        // 自定义配置
        config: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    computed: {},
    data() {
        return {
            myStyle: {
                height: '300px',
            },
        }
    },
    methods: {
        init() {
            const $chart = this.$refs.chart // div
            this.myChart = echarts.init($chart)
        },

        drawChart() {
            let options = this.getOption(this.option, this.config)
            //console.log('drawChart', options)
            // 第二个参数notMerge 不许和上次的legend合并
            this.myChart.setOption(options, true)
        },
    },
    watch: {
        config: {
            handler(newVal, val) {
                this.$nextTick(() => {
                    this.drawChart()
                })
            },
            deep: true,
        },
    },
    activated() {
        // 原因是组件keepAlive后切换到其他页面，resize生效后宽度获取不到 因此为0 导致切回来看不见图表
        // 重新计算宽度 防止缩放后图表过小过着过大
        //this.resizeChart();
    },
    mounted() {
        //this.parentWidth = this.$parent.$el.offsetWidth;
        this.$nextTick(() => {
            this.init()
            this.drawChart()
        })
    },
    beforeDestroy() {
        //this.auto && removeResizeListener(this.$refs.chart.parentNode, this.handleResize);
    },
}
</script>
