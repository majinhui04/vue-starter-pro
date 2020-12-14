<template>
    <bm-control>
        <bm-info-window
            title="弹窗信息"
            :position="myPosition"
            :show="myVisible"
            @close="infoWindowClose"
            @open="infoWindowOpen"
        >
            <div class="marker-info" style="max-height:250px;overflow-y:auto">
                <div v-for="(marker, index) in myResult" :key="index">
                    <p>
                        <i class="marker" :class="marker.$class">
                            <!-- <b>{{ marker.$index }}</b> -->
                        </i>
                        {{ marker.$title }}
                        <a
                            :href="marker.detailUrl"
                            target="_blank"
                            class="sg-color-link"
                            >详情»</a
                        >
                    </p>
                    <p>电话：{{ marker.tel }}</p>
                    <p>地址：{{ marker.dom }}</p>
                    <p>
                        <el-tag
                            v-for="(tag, index) in marker.$tags"
                            :key="index"
                            :type="tag.type"
                            size="mini"
                            style="margin-right:5px"
                            >{{ tag.label }}</el-tag
                        >
                    </p>
                    <p>
                        <el-button
                            v-if="hasAction"
                            type="primary"
                            @click="handleSaveOne(marker)"
                        >
                            保存至企业网格
                        </el-button>
                    </p>
                </div>
            </div>
        </bm-info-window>
    </bm-control>
</template>

<script>
import { BmlMarkerClusterer } from 'vue-baidu-map'
export default {
    components: { BmlMarkerClusterer },
    props: {
        hasAction: {
            type: Boolean,
            default: false,
        },
        visible: {
            type: Boolean,
            default: false,
        },
        position: {
            type: Object,
            default: {},
        },
        result: {
            type: Array,
            default() {
                return []
            },
        },
    },

    data() {
        return {
            marker: {
                $showFlag: true,
                lng: 120.42774989574846,
                lat: 30.390923998143255,
            },
            myResult: [],
            myPosition: null,
        }
    },
    watch: {
        position: {
            handler(val) {
                if (val) {
                    this.myPosition = val
                }
            },
            immediate: true,
        },
        result: {
            handler(val) {
                this.myResult = val || []
            },
            immediate: true,
        },
    },
    computed: {
        myVisible: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            },
        },
    },
    created() {
        console.log('created')
    },
    destroyed() {
        console.log('destroyed')
    },
    methods: {
        show({ lng, lat }) {
            this.marker.$showFlag = true
            this.marker.lng = lng
            this.marker.lat = lat
        },
        handleSaveOne(marker) {
            this.$emit('save', marker)
        },
        infoWindowClose(marker) {
            this.myVisible = false
        },
        infoWindowOpen(marker) {
            this.myVisible = true
        },
    },
}
</script>
