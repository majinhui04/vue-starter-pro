<template>
    <!-- 网格导入 -->
    <el-dialog
        ref="dialog"
        :title="title"
        :visible.sync="myVisible"
        class="sg-dialog"
        width="800px"
        :append-to-body="true"
        :close-on-click-modal="false"
    >
        <sg-data-view :columns="columns" :load="load" ref="level1Table">
        </sg-data-view>
    </el-dialog>
</template>
<script>
export default {
    name: 'GridImportHistoryDialog',
    props: {
        meta: {
            type: Object,
            default() {
                return {
                    type: 1,
                }
            },
        },
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            loading: false,
            title: '导入记录',
            load: params => {
                params = {
                    ...params,
                    type: this.meta.type,
                }
                return this.$api.get_import_log(params).then(({ data }) => {
                    const result = data.data
                    const total = data.total
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
                    label: '模板类型',
                    prop: '$type',
                },
                {
                    label: '文件名称',
                    prop: 'name',
                },
                {
                    label: '上传日期',
                    prop: '$cTime',
                },
                {
                    label: '上传人',
                    prop: 'operator',
                },
                {
                    label: '成功导入数据(条)',
                    prop: 'sCount',
                },
                {
                    label: '导入失败',
                    prop: 'fCount',
                    render: (h, { row }) => {
                        if (row['fCount']) {
                            return [
                                h(
                                    'a',
                                    {
                                        attrs: {
                                            target: '_blank',
                                            class: 'sg-link',
                                            href: row['downUrl'],
                                        },
                                        // on: {
                                        //     click: () => {
                                        //         // this.$utils.download(
                                        //         //     process.env
                                        //         //         .VUE_APP_BASEURL_API +
                                        //         //         `/cus/imp/log/download-error-file?id=${row.id}`,
                                        //         // )
                                        //         console.log(
                                        //             process.env
                                        //                 .VUE_APP_BASEURL_API +
                                        //                 `/cus/imp/log/download-error-file?id=${row.id}`,
                                        //         )
                                        //         this.$api.download_import_log({
                                        //             id: row.id,
                                        //         })
                                        //     },
                                        // },
                                    },
                                    row['fCount'] + ' 下载',
                                ),
                            ]
                        } else {
                            return '-'
                        }
                    },
                },
            ],

            visible: false,
        }
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
    methods: {
        handleClose() {
            this.myVisible = false
        },
    },
    async created() {},
}
</script>
