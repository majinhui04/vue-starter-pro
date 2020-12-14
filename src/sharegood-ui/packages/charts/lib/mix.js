import BaseChart from '../BaseChart'
export default {
    components: {
        BaseChart,
    },
    props: {
        config: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    computed: {},

    methods: {},
    watch: {
        config: {
            handler(newVal, val) {
                this.$nextTick(() => {
                    this.$refs['chart'].drawChart()
                })
            },
            deep: true,
        },
    },
    mounted() {},
}
