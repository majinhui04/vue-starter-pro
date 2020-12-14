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
        <my-map name="mapQuery" v-bind="$attrs"></my-map>
    </el-dialog>
</template>
<script>
export default {
    name: 'MapQueryDialog',
    props: {
        // 地图网格添加企业
        title: {
            type: String,
            default: '地图网格添加企业',
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
        onUpdate() {},

        async handleSubmit() {
            try {
                const { row, form } = this
                await this.$api.save_grid_move({
                    pripids: row.pripid,
                    gridCode: form.code2,
                })
                this.$message.success('保存成功')
                this.$emit('success')
                this.myVisible = false
            } catch (err) {
                console.error(err)
            }
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
