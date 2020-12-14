<template>
    <bm-control>
        <!-- <bml-marker-clusterer :averageCenter="true"> -->
        <bm-info-window
            title="弹窗信息"
            :position="{
                lng: marker.longitude,
                lat: marker.latitude,
            }"
            :show="marker.$showFlag"
            @close="infoWindowClose(marker)"
            @open="infoWindowOpen(marker)"
        >
            <div class="marker-info">
                <p>
                    <i class="marker" :class="marker.$class">
                        <b>{{ marker.$index }}</b>
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
        </bm-info-window>
        <!-- 网格内所有点 -->
        <template v-for="marker in myResult">
            <bm-marker
                v-if="marker.$url && marker.longitude && marker.latitude"
                :icon="{
                    url: marker.$url,
                    size: { width: 23, height: 25 },
                }"
                :key="marker.pripid"
                :position="{
                    lng: marker.longitude,
                    lat: marker.latitude,
                }"
                @click="infoWindowOpen(marker)"
            >
            </bm-marker>
        </template>
        <!-- </bml-marker-clusterer> -->
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
        result: {
            type: Array,
            default() {
                return []
            },
        },
    },
    watch: {
        result(val) {
            console.log('watch--------result', val)
            this.myResult = val.map(item => {
                return Object.freeze(item)
            })
        },
    },
    data() {
        return {
            marker: {
                $showFlag: false,
                $tags: '',
                longitude: 120.42774989574846,
                latitude: 30.390923998143255,
            },
            myResult: [],
        }
    },
    created() {
        this.myResult = this.result.map(item => {
            return Object.freeze(item)
        })
    },
    mounted() {},
    methods: {
        infoWindowClose(marker) {
            marker.$showFlag = false
        },
        infoWindowOpen(marker) {
            Object.assign(this.marker, {
                ...marker,
            })
            console.log('infoWindowOpen', this.marker, marker)
            this.marker.$showFlag = true
        },
        handleSaveOne(model) {
            this.$emit('save', model)
        },
    },
}
</script>
