<template>
    <!-- 网格移动 -->

    <el-dialog
        ref="dialog"
        title="移动企业至其他网格"
        :visible.sync="myVisible"
        class="sg-dialog"
        width="600px"
        :append-to-body="true"
        :close-on-click-modal="false"
    >
        <sg-page-form
            ref="formRef"
            :span="24"
            :inline="true"
            :rules="rules"
            v-model="formData"
            @update="onUpdate"
            :field-list="fields"
            label-width="150px"
        >
            <div class="sg-flexbox " slot="row2">
                <el-select
                    v-model="form.code1"
                    placeholder="请选择"
                    style="margin-right:7px"
                    @change="onLevel1Change"
                >
                    <el-option
                        v-for="item in level1List"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-select
                    v-model="form.code2"
                    placeholder="请选择"
                    @change="onLevel2Change"
                >
                    <el-option
                        v-for="item in level2List"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>

            <el-row type="flex" justify="center" slot="footer">
                <el-button type="default" size="small" @click="handleClose"
                    >取消</el-button
                >
                <el-button
                    type="primary"
                    @click="handleSubmit"
                    native-type="submit"
                    size="small"
                    >保存
                </el-button>
            </el-row>
        </sg-page-form>
    </el-dialog>
</template>
<script>
export default {
    name: 'GridChangeDialog',
    props: {
        needLevel2: {
            type: Boolean,
            default: false,
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
            form: {
                code1: '',
                code2: '',
            },
            level1List: [],
            level2List: [],
            options: [],
            fields: [
                {
                    name: 'row2',
                    label: '请选择目的网格',
                    fieldType: 'FormItem',
                },
            ],
            formData: {
                row1: '',
            },
            rules: {},
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
                    this.level2List = result
                })
        },
        async handleSubmit() {
            try {
                const { row, form } = this
                const selected = this.meta.selected
                const pripids = selected.map(item => item.pripid)
                let gridCode = form.code2 || form.code1
                if (!form.code1) {
                    this.$message.warning('请选择一级网格')
                    return
                }
                if (!form.code2 && this.needLevel2) {
                    this.$message.warning('请选择二级网格')
                    return
                }
                await this.$api.save_grid_move({
                    $$pripids: pripids,
                    gridCode: gridCode,
                })
                this.$message.success('保存成功')
                this.$emit('success')
                this.myVisible = false
            } catch (err) {
                console.error(err)
            }
        },
    },
    async created() {
        const level1List = await this.$api.get_grid_options({
            gridLevel: 1,
            pageSize: 100,
        })
        this.level1List = level1List
    },
    mounted() {},
}
</script>
