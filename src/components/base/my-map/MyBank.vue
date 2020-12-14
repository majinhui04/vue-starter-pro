<template>
    <bm-control>
        <template v-for="(item, index) in result">
            <bm-marker
                :key="index"
                @click="handleBankClick(item)"
                :position="item.$model.$position"
                :icon="{
                    url: item.$model.$url,
                    size: { width: 23, height: 25 },
                }"
            >
                <bm-info-window
                    title="弹窗信息"
                    :position="item.$model.$position"
                    :show="item.$model.$showFlag"
                    @close="infoWindowClose(item)"
                    @open="infoWindowOpen(item)"
                >
                    <div class="bank-marker-info">
                        <p>
                            {{ item.$model.name }}
                        </p>
                        <p>电话：{{ item.$model.orgTel }}</p>
                        <p>地址：{{ item.$model.orgAddr }}</p>
                    </div>
                </bm-info-window>
            </bm-marker>
        </template>
    </bm-control>
</template>

<script>
export default {
    props: {
        result: {
            type: Array,
            default() {
                return []
            },
        },
    },
    mounted() {},
    methods: {
        infoWindowClose(marker) {
            marker.$model.$showFlag = false
        },
        infoWindowOpen(marker) {
            marker.$model.$showFlag = true
        },
        handleBankClick(marker) {
            marker.$model.$showFlag = true
            this.$emit('click', marker.$model)
        },
    },
}
</script>
