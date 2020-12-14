<template>
    <!-- 准入失败原因 -->
    <el-dialog
        ref="pDialog"
        :title="MyTitle"
        :visible.sync="visible"
        class="sg-dialog company-pass-dialog"
        width="550px"
        :append-to-body="true"
        :close-on-click-modal="false"
    >
        <sg-page-form
            ref="pFormRef"
            :span="24"
            :inline="true"
            justify=""
            v-model="pDialog.fieldData"
            :field-list="pDialog.fields"
            label-width="120px"
        >
            <template slot="reason">
                <div
                    style="width:100%"
                    v-for="(item, index) in result.$rejectedReasonName"
                    :key="index"
                >
                    {{ item }}
                </div>
            </template>
            <el-row type="flex" justify="center" slot="footer">
                <el-button type="primary" @click="myVisible = false"
                    >知道了</el-button
                >
            </el-row>
        </sg-page-form>
    </el-dialog>
</template>
<script>
export default {
    name: 'CompanyPassDialog',
    props: {
        model: {
            type: Object,
            default() {
                return {}
            },
        },
        meta: {
            type: Object,
            default() {
                return {
                    entName: '萨卡开始啦',
                    pripid: '3304810090073888',
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
            result: {},
            pDialog: {
                visible: false,
                fieldData: {
                    name: this.meta.entName,
                    reason: '',
                },
                fields: [
                    {
                        name: 'name',
                        label: '企业名称',
                        placeholder: '',
                        fieldType: 'label',
                    },
                    {
                        class: 'reason',
                        name: 'reason',
                        label: '未通过准入原因',
                        placeholder: '',
                        fieldType: 'FormItem',
                    },
                ],
            },
            visible: false,
        }
    },
    computed: {
        MyTitle() {
            return '详情'
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
    async created() {
        try {
            const { data } = await this.$api.get_refuse_reason({
                pripid: this.meta.pripid,
            })
            this.result = data
            console.log(1111, data)
        } catch (err) {
            console.error(err)
        }
    },
    mounted() {},
}
</script>
<style lang="less">
.company-pass-dialog {
    .reason {
        .el-form-item__content {
            display: block;
        }
    }
}
</style>
