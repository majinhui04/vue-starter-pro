<template>
    <div class="sg-page-form-container">
        <slot name="header"></slot>
        <el-form
            :inline="inline"
            ref="form"
            :rules="rules"
            :model="formData"
            class="sg-page-form"
            :label-width="labelWidth"
            :size="size"
            @submit.native.prevent
        >
            <el-row
                type="flex"
                :gutter="gutter"
                class="sg-form-row"
                :justify="justify"
            >
                <template v-for="field in getConfigList()">
                    <slot
                        v-if="field.fieldType === 'slot'"
                        :name="field.name"
                    ></slot>
                    <template v-else>
                        <el-col :key="field.name" :span="span">
                            <template v-if="field.fieldType === 'FormItem'">
                                <el-form-item
                                    :label="field.label"
                                    :prop="field.name"
                                    :name="field.name"
                                    :key="field.name"
                                    :class="field.class"
                                >
                                    <slot :name="field.name"></slot>
                                </el-form-item>
                            </template>
                            <component
                                v-else
                                class="sg-form-item"
                                :class="field.class"
                                :key="field.name"
                                :title="field.label"
                                :is="getFieldType(field.fieldType)"
                                :value="formData[field.name]"
                                @input="updateForm"
                                v-bind="field"
                                ref="formItem"
                                @form-item="onFormItem"
                            >
                                <template>
                                    <slot :name="field.name"></slot>
                                </template>
                            </component>
                        </el-col>
                    </template>
                </template>
            </el-row>

            <slot name="footer">
                <el-row type="flex" justify="center">
                    <el-button
                        type="primary"
                        @click="submit"
                        native-type="submit"
                        size="small"
                        >{{ onSubmitText }}
                    </el-button>
                    <el-button type="default" @click="reset" size="small">{{
                        onResetText
                    }}</el-button>

                    <slot name="footer-btn"></slot>
                </el-row>
            </slot>
        </el-form>
    </div>
</template>

<script>
import SelectList from './select-list'
import TextInput from './text-input'
import TimeSelector from './time-selector'
import Radio from './radio'
import MyCheckbox from './checkbox'
import MyLabel from './label'
import MySlider from './slider'
import cascader from './cascader'
import range from './range'
import MyUploader from './uploader'

const types = {
    radio: 'Radio',
    input: 'TextInput',
    text: 'TextInput',
    password: 'TextInput',
    textarea: 'TextInput',
    date: 'TimeSelector',
    select: 'SelectList',
    label: 'MyLabel',
    slider: 'MySlider',
    cascader: 'cascader',
    range: 'range',
    uploader: 'MyUploader',
    checkbox: 'MyCheckbox',
}

export default {
    name: 'SgPageForm',
    components: {
        MyCheckbox,
        SelectList,
        TextInput,
        TimeSelector,
        Radio,
        MyLabel,
        MySlider,
        cascader,
        range,
        MyUploader,
    },
    props: {
        formItemRef: {
            type: Object,
            default: {},
        },
        span: {
            type: [Number, String],
            default: 6,
        },
        justify: {
            type: [String],
            default: 'center',
        },
        gutter: {
            type: [Number, String],
            default: 0,
        },
        inline: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'small', // medium / small / mini
        },
        // 相关字段
        fieldList: {
            type: Array,
        },
        // 验证规则
        rules: {
            type: Object,
        },
        // label宽度
        labelWidth: {
            type: [Number, String],
            default: '120px',
        },
        // label宽度
        onSubmitText: {
            type: String,
            default: '提交',
        },
        // label宽度
        onResetText: {
            type: String,
            default: '重置',
        },
        onMoreText: {
            type: String,
            default: '更多搜索',
        },
        value: {
            type: Object,
        },
    },
    data() {
        return {
            isFirst: true,
            hiddens: [],
            types: types,
            formData: this.value,
        }
    },
    computed: {
        isShowMore() {
            return this.fieldList.some(item => {
                item.visible === false
            })
        },
    },
    watch: {
        // 表单项更改参数后重新渲染
        fieldList: {
            handler: function(val) {
                this.getHiddens()
                //console.log('watch:fieldList', val)
                this.getConfigList()
                if (val.length && this.isFirst) {
                    this.initData()
                }
            },
            immediate: true,
            deep: true,
        },
        // 用户输入的时候需要修改内部form 不然无法输入
        value: {
            handler: function(val) {
                this.formData = val
            },
            deep: true,
        },
        data: {
            handler: function(val) {
                // 将form实例返回到父级
                this.$emit('update:refObj', this.$refs.form)
            },
            deep: true, // 深度监听
        },
    },
    mounted() {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
    },
    methods: {
        setData(name, value) {
            if (!this.formData.hasOwnProperty(name)) {
                this.$set(this.formData, name, value)
            } else {
                this.formData[name] = value
            }
        },
        // 初始化
        initData() {
            this.fieldList.forEach(item => {
                const { name, fieldType } = item

                if (item.hasOwnProperty('value')) {
                    this.setData(name, value)
                } else {
                    if (!this.formData.hasOwnProperty(name)) {
                        if (['input', 'select'].indexOf(fieldType) > -1) {
                            this.setData(name, '')
                        }
                    }
                }
            })

            this.$emit('input', this.formData)
            this.isFirst = false
        },

        getHiddens() {
            this.hiddens = this.fieldList
                .map(item => {
                    if (item.hasOwnProperty('visible')) {
                        return item
                    }
                })
                .filter(item => item)
        },
        getFieldType(type) {
            const types = this.types

            if (types[type]) {
                return types[type]
            } else {
                return null
            }
        },
        // 获取字段列表
        getConfigList() {
            return this.fieldList.filter(item => item.visible !== false)
        },
        // 获取子组件ref
        getRefField(name) {
            const result = this.$refs['formItem'].filter(
                item => item.name === name,
            )[0]

            return result
        },
        // 获取字段列表field
        getField(name) {
            return this.fieldList.filter(item => item.name === name)[0]
        },
        // 根据名字获取表单配置 ['name'] => [{}]
        getFields(names) {
            const map = {}
            this.fieldList.forEach(item => {
                map[item.name] = item
            })
            return names.map(name => map[name])
        },
        updateForm(fieldName, value, item) {
            this.setData(fieldName, value)

            // console.log(
            //     'updateForm',
            //     fieldName,
            //     value,
            //     JSON.stringify(this.formData),
            // )
            //console.log('updateForm', fieldName, value)
            //this.$set(this.formData, fieldName, value)
            this.$emit(`update`, fieldName, value, item)
            //this.$emit(`update`, fieldName, value, item)
            // v-model
            this.$emit('input', this.formData)
        },
        // 显示/隐藏更多的条件
        toggle() {
            const hiddens = this.hiddens

            this.hiddens.forEach(item => {
                item.visible = !item.visible
            })
        },
        submit() {
            this.$emit('submit')
        },
        validate(cb) {
            this.$refs['form'].validate(valid => {
                cb && cb(valid)
            })
        },
        reset() {
            this.$refs['form'].resetFields()
            // todo
            // Object.keys(this.formData).forEach(key => {
            //     delete this.formData[key]
            // })
            this.$emit('reset')
        },
    },
}
</script>
