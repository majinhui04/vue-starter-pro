<template>
    <el-dialog
        ref="dialog"
        :title="myTitle"
        :visible.sync="myVisible"
        class="sg-dialog"
        width="1200px"
        :append-to-body="true"
        :close-on-click-modal="false"
    >
        <sg-data-view
            :pageVisible="false"
            :columns="columns"
            :load="load"
            ref="table"
        >
        </sg-data-view>
        <el-row type="flex" justify="center">
            <el-button type="primary" @click="myVisible = false"
                >知道了</el-button
            >
        </el-row>
    </el-dialog>
</template>
<script>
export default {
    name: 'GridChildrenDialog',
    props: {
        title: {
            type: String,
            default: '',
        },
        model: {
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
            load: params => {
                const pGridCode = this.model.gridCode
                params = {
                    ...params,
                    pGridCode,
                    gridLevel: 2,
                    pageSize: 100,
                }
                return this.$api.get_grid_list(params).then(res => {
                    const result = res.data.data || []
                    const total = res.data.total
                    console.log(1111, result)
                    return {
                        result,
                        total,
                    }
                })
            },
            columns: [
                {
                    type: 'index',
                    label: '序号',
                },
                {
                    label: '二级网格名称',
                    prop: 'gridName',
                },
                {
                    label: '关联区域',
                    prop: 'content',
                    width: '300px',
                    tooltip: true,
                },
                {
                    label: '关联客户经理',
                    prop: 'ownerName',
                },
                {
                    label: '所属一级网格',
                    prop: 'pGridName',
                },
                {
                    label: '所属一级关联区域',
                    prop: 'pContent',
                    tooltip: true,
                    width: '300px',
                },
                {
                    label: '所属支行',
                    prop: 'pOwnerName',
                },

                {
                    label: '备注',
                    prop: 'remark',
                },
            ],
            visible: false,
        }
    },
    computed: {
        myTitle() {
            return this.model.gridName + '-' + '二级网络详情'
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
    methods: {},
    async created() {},
    mounted() {},
}
</script>
