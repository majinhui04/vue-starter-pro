<template>
    <!-- 批次 -->
    <el-dialog
        ref="pDialog"
        :title="MyTitle"
        :visible.sync="myVisible"
        class="sg-dialog"
        width="550px"
        :append-to-body="true"
        :close-on-click-modal="false"
    >
        <sg-page-form
            ref="pFormRef"
            :span="24"
            :inline="true"
            :rules="pDialog.rules"
            justify=""
            v-model="pDialog.fieldData"
            :field-list="pDialog.fields"
            label-width="120px"
        >
            <el-row type="flex" justify="center" slot="footer">
                <el-button type="default" @click="cancel">取消</el-button>

                <el-button
                    @click="handleSave"
                    type="primary"
                    native-type="submit"
                    >保存
                </el-button>
            </el-row>
        </sg-page-form>
    </el-dialog>
</template>
<script>
import { validateName } from '@/scripts/validator'
export default {
    name: 'CompanySaveDialog',
    props: {
        type: {
            type: String,
            default: '', // save_ent_add_batch_by_params_es
        },
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
                    params: null,
                    pripids: [],
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
            pDialog: {
                rules: {
                    batchName: [
                        { required: true, message: '请填写', trigger: 'blur' },
                        { validator: validateName, trigger: 'change' },
                    ],
                },
                visible: false,
                fieldData: {
                    batchNo: '',
                    batchName: '',
                },
                fields: [
                    {
                        name: 'batchNo',
                        label: '添加批次',
                        placeholder: '',
                        fieldType: 'label',
                    },
                    {
                        name: 'batchName',
                        label: '批次名称',
                        placeholder: '4-20位数字、大小写字母或中文组合',
                        fieldType: 'input',
                    },
                ],
            },
            visible: false,
        }
    },
    computed: {
        MyTitle() {
            if (this.meta.pripids) {
                return `保存添加批次--共${this.meta.pripids.length}家公司`
            } else {
                return '一键保存添加批次'
            }
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
        cancel() {
            this.myVisible = false
        },
        onUpdate() {},
        async handleSave() {
            this.$refs['pFormRef'].validate(async valid => {
                if (!valid) {
                    return
                }
                try {
                    const { pripids, params } = this.meta

                    if (pripids) {
                        await this.$api.save_ent_add_batch({
                            pripids: pripids.join(','),
                            ...this.pDialog.fieldData,
                        })
                    } else {
                        if (this.type === 'es') {
                            await this.$api.save_ent_add_batch_by_params_es({
                                params,
                                ...this.pDialog.fieldData,
                            })
                        } else {
                            await this.$api.save_ent_add_batch_by_params({
                                params,
                                ...this.pDialog.fieldData,
                            })
                        }
                    }

                    this.$message.success('操作成功')
                    this.$emit('success')
                    this.myVisible = false
                } catch (err) {
                    throw err
                }
            })
        },
    },
    async created() {
        try {
            const { data: batchNo } = await this.$api.get_add_batch()
            this.pDialog.fieldData.batchNo = batchNo
            this.pDialog.fieldData.batchName = ''
        } catch (err) {
            console.error(err)
        }
    },
    destroyed() {
        console.log('destroyed')
    },
    mounted() {},
}
</script>
