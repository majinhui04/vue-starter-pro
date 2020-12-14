<template>
    <bm-control>
        <!-- <bml-marker-clusterer :averageCenter="true"> -->
        <template v-for="marker of myResult">
            <bm-marker
                :icon="{
                    url: marker.url,
                    size: { width: 23, height: 25 },
                }"
                :key="`${marker.lng},${marker.lat}`"
                :position="{
                    lng: marker.lng,
                    lat: marker.lat,
                }"
                @click="open(marker)"
            >
            </bm-marker>
        </template>
        <!-- </bml-marker-clusterer> -->
    </bm-control>
</template>

<script>
import { BmlMarkerClusterer } from 'vue-baidu-map'
export default {
    components: {
        BmlMarkerClusterer,
    },
    props: {
        result: {
            type: Array,
            default() {
                return []
            },
        },
    },
    watch: {
        result: {
            handler(val) {
                this.myResult = val
            },
            immediate: true,
        },
    },
    data() {
        return {
            myResult: [],
        }
    },

    mounted() {},
    methods: {
        open(marker) {
            this.$emit('open', marker)
        },
    },
}
</script>
