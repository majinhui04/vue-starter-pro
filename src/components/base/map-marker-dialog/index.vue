<template>
    <el-dialog
        ref="dialog"
        :title="myTitle"
        :visible.sync="myVisible"
        class="sg-dialog sg-map-dialog"
        width="90%"
        :append-to-body="true"
        :close-on-click-modal="false"
        :fullscreen="true"
    >
        <my-map name="mapMarker" v-bind="$attrs"></my-map>
    </el-dialog>
</template>
<script>
export default {
    name: 'MapQueryDialog',
    props: {
        title: {
            type: String,
            default: '地图查看',
        },
        row: {
            type: Object,
            default() {
                return {}
            },
        },
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            visible: false,
        }
    },
    computed: {
        myTitle() {
            return this.title
        },
        myVisible: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            },
        },
    },
    methods: {
        handleClose() {
            this.myVisible = false
        },
    },
    async created() {},
    mounted() {},
}
</script>
<style lang="less">
.sg-map-dialog {
    .el-dialog__body {
        padding: 0;
    }
}
</style>
