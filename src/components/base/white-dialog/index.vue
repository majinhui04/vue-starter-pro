<template>
    <!-- 添加白名单 -->
    <el-dialog
        ref="pDialog"
        :title="MyTitle"
        :visible.sync="visible"
        class="sg-dialog white-dialog"
        width="700px"
        :append-to-body="true"
        :close-on-click-modal="false"
    >
        <sg-page-form
            ref="pFormRef"
            :span="24"
            :inline="true"
            :rules="editForm.rules"
            justify=""
            v-model="editForm.model"
            :field-list="editForm.fields"
            label-width="120px"
        >
            <!-- <el-form-item label="萨克斯科拉达" prop="reason" slot="reason">
                <el-input
                    style="width:100%;"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入内容"
                    v-model="editForm.reason"
                ></el-input>
            </el-form-item> -->
            <template slot="footer">
                <div class="row-bg sg-flexbox">
                    <div :span="8">客户经理 {{ user.realName }}</div>
                    <div
                        class="sg-flex-1 sg-flexbox "
                        style="justify-content:center"
                    >
                        <span>所属网点</span>
                        {{ meta.gridCodeBankOwnerName }}
                        <div
                            class="sg-table-txt-cut"
                            style="margin-left:5px;width:250px"
                        ></div>
                    </div>
                    <div style="text-align:right">
                        申请日期 {{ new Date() | dateFormat }}
                    </div>
                </div>
                <el-row type="flex" justify="center">
                    <el-button type="default" @click="handleClose"
                        >取消</el-button
                    >

                    <el-button
                        @click="handleSave"
                        type="primary"
                        native-type="submit"
                        >提交
                    </el-button>
                </el-row>
            </template>
        </sg-page-form>
    </el-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: {
        model: {
            type: Object,
            default() {
                return {
                    params: null,
                    pripids: [],
                }
            },
        },
        meta: {
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
            editForm: {
                rules: {
                    reason: [
                        {
                            required: true,
                            message: '请输入理由',
                            trigger: 'blur',
                        },
                    ],
                    $checkUsers: [
                        {
                            required: true,
                            message: '请选择',
                            trigger: 'blur',
                        },
                    ],
                },
                model: {
                    pripid: this.meta.pripid,
                    reason: '',
                    isSmsNotice: '0',
                },
                fields: [
                    {
                        name: 'reason',
                        label: '添加理由',
                        placeholder: '',
                        fieldType: 'input',
                        type: 'textarea',
                    },
                    {
                        name: '$checkUsers',
                        label: '选择审批人员',
                        placeholder: '',
                        fieldType: 'checkbox',
                        options: () => {
                            return this.$api.get_bank_admins_options()
                        },
                    },
                    {
                        name: 'isSmsNotice',
                        label: '是否发送短信通知',
                        placeholder: '',
                        fieldType: 'radio',
                        options: [
                            {
                                label: '是',
                                value: '1',
                            },
                            {
                                label: '否',
                                value: '0',
                            },
                        ],
                    },
                ],
            },
            visible: false,
        }
    },
    computed: {
        ...mapState({
            user: state => state.app.user,
        }),
        companyName() {
            return this.meta.entName
        },
        MyTitle() {
            return '添加白名单-' + this.meta.entName
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
        onUpdate() {},
        handleClose() {
            this.myVisible = false
        },
        async handleSave() {
            try {
                const { model } = this.editForm
                await this.$api.add_ent_white(model)
                this.$message.success('操作成功')
                this.$emit('success')
                this.myVisible = false
            } catch (err) {
                throw err
            }
        },
    },
    async created() {
        try {
        } catch (err) {
            console.error(err)
        }
    },
    mounted() {
        console.log(this.$store.state.app.user, this.user)
    },
}
</script>
<style lang="less">
.white-dialog {
    .row-bg {
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        background-color: #f5f5f5;
        margin-bottom: 16px;
    }
}
</style>
