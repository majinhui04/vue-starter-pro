<template>
    <!-- 网格导入 -->
    <el-dialog
        ref="dialog"
        :title="title"
        :visible.sync="myVisible"
        class="sg-dialog"
        width="600px"
        :append-to-body="true"
        :close-on-click-modal="false"
        v-loading.fullscreen.lock="loading"
    >
        <sg-page-form
            ref="formRef"
            :span="24"
            :inline="true"
            :rules="editForm.rules"
            v-model="editForm.model"
            @update="onUpdate"
            :field-list="editForm.fields"
            label-width="150px"
        >
            <div slot="header" class="sg-custom-block warning">
                <span>导入格式支持 excel格式，请先下载EXCEL导入模版</span>
                <span style="margin-left:7px;">
                    <a target="_blank" :href="meta.templateUrl" class="sg-link"
                        >模板.xlsx</a
                    >
                </span>
            </div>
            <div slot="footer">
                <div class="sg-custom-block tip" style="margin-bottom:15px">
                    <div class="title">Excel导入说明:</div>
                    <div>
                        <p>1、导入数据时请先下载EXCEL导入模版或者；</p>
                        <p>2、下载导入模板后请按照导入模板里的字段填录信息；</p>
                        <p>
                            3、使用非本系统提供的导入模板或擅自修改导入模板的格式和内容会导致操作不成功。
                        </p>
                    </div>
                </div>
                <el-row type="flex" justify="center">
                    <el-button type="default" size="small" @click="handleClose"
                        >取消</el-button
                    >
                    <el-button
                        type="primary"
                        @click="handleSubmit"
                        native-type="submit"
                        size="small"
                        >确定
                    </el-button>
                </el-row>
            </div>
        </sg-page-form>
    </el-dialog>
</template>
<script>
export default {
    name: 'GridImportDialog',
    props: {
        meta: {
            type: Object,
            default() {
                return {
                    templateUrl:
                        process.env.BASE_URL + 'static/upload/一级网格.xlsx',
                    $type: '一级网格',
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
            title: '导入网格信息',
            editForm: {
                rules: {},
                model: {
                    level1: this.meta.$type,
                    files: [],
                },
                fields: [
                    {
                        name: 'level1',
                        label: '网格模板类型',
                        fieldType: 'label',
                    },
                    {
                        name: 'files',
                        label: '请选择文件',
                        fieldType: 'uploader',

                        tip: '支持扩展名：.xls  .xlsx',
                        'http-request': params => {
                            const { file } = params
                            console.log('http-request', params)
                            this.$api
                                .uploadGrid({
                                    file,
                                    type: this.meta.type,
                                })
                                .then(res => {
                                    let data = res.data || {}
                                    if (data.failTotal) {
                                        this.$message.error(
                                            `导入失败${data.failTotal}条`,
                                        )
                                    } else {
                                        this.$message.success(
                                            `导入成功${data.importTotal}条`,
                                        )
                                        this.myVisible = false
                                        this.$emit('success')
                                    }
                                })
                                .catch(err => {
                                    //this.$message.error('上传失败')
                                })
                        },
                    },
                ],
            },

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
        onUpdate() {},
        onLevel1Change(value) {
            this.$api
                .get_grid_options({
                    pGridCode: value,
                    gridLevel: 2,
                    pageSize: 100,
                })
                .then(result => {
                    console.log(1, result)
                    this.level2List = result
                })
        },
        handleSubmit() {
            const uploaderRef = this.$refs['formRef'].getRefField('files')
            uploaderRef.submit()
        },
    },
    async created() {},
    mounted() {
        console.log('mounted', this.$refs)
    },
}
</script>
