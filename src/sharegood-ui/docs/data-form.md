## 动态表单

### 基础属性

| 参数          | 说明            | 类型             | 可选值 | 默认值 |
| ------------- | --------------- | ---------------- | ------ | ------ |
| fields        | 表单数据        | Array            | —      | -      |
| rules         | 校验规则        | Object           | —      | -      |
| labelWidth    | 全局 label 宽度 | [Number, String] | —      | 120px  |
| type          | 布局模式        | String           | —      | flex   |
| span          | 每列宽度        | [Number, String] | [1,24] | 8      |
| justify       | 水平布局        | String           | —      | -      |
| isFieldInline | 表单域布局      | Boolean          | —      | true   |

### 方法

| 事件名称     | 说明     | 回调参数  |
| ------------ | -------- | --------- |
| validate     | 校验数据 |           |
| reset        | 重置数据 |           |
| setFieldData | 重置数据 | name,data |

### 事件

| 事件名称 | 说明     | 回调参数     |
| -------- | -------- | ------------ |
| submit   | 提交数据 |              |
| reset    | 数据重置 |              |
| update   | 数据变化 | (name,value) |

### 表单域属性

| 参数        | 说明           | 类型               | 可选值 | 默认值                                                       |
| ----------- | -------------- | ------------------ | ------ | ------------------------------------------------------------ |
| fieldType   |                |                    | —      | ['input','select','date','checkbox','radio','slot','action'] |
| slotName    | 对应的插槽     |                    | —      | -                                                            |
| label       | 表单名称       |                    | —      |                                                              |
| name        | 表单 key       |                    | —      |                                                              |
| span        | 列宽           | [Number, Function] | [1,24] |                                                              |
| class       | 自定义列 Class |                    | —      | -                                                            |
| placeholder | 占位           |                    | —      |                                                              |
| visible     | 是否显示       |                    | —      | true                                                         |
| onChange    | 数据变化       | Function           | —      |                                                              |

```html
<template>
    <div class="my-page DemoForm">
        <section class="example">
            <h2>查询表单</h2>
            <div class="result">{{ FormView1.model }}</div>
            <sg-data-form
                :fields="FormView1.fields"
                v-model="FormView1.model"
                :span="8"
                :gutter="0"
            >
                <el-radio-group v-model="FormView1.model.status" slot="status">
                    <el-radio-button label="1">已分配</el-radio-button>
                    <el-radio-button label="2">未分配</el-radio-button>
                </el-radio-group>
                <div slot="sp">特殊组件业务逻辑</div>
            </sg-data-form>
        </section>

        <section class="example">
            <h2>提交表单</h2>

            <div class="result">{{ FormView2.model }}</div>
            <div class="example-dialog">
                <sg-data-form
                    class="my-submit-form"
                    :fields="FormView2.fields"
                    v-model="FormView2.model"
                    :rules="FormView2.rules"
                    :span="12"
                    :gutter="0"
                    ref="myForm"
                    @submit="onSubmit"
                    @reset="onReset"
                    @update="onUpdate"
                >
                    <span slot="name-input-append">天</span>
                    <div slot="desc-append">
                        提示： 这里的文字不能包含特殊字符
                    </div>
                    <div slot="sp">
                        <el-rate v-model="FormView2.model.rate"></el-rate>
                    </div>
                </sg-data-form>
            </div>
        </section>

        <section class="example">
            <h2>竖立表单</h2>

            <div class="result">{{ FormView3.model }}</div>
            <div class="example-dialog">
                <sg-data-form
                    class="my-submit-form"
                    :fields="FormView3.fields"
                    v-model="FormView3.model"
                    :rules="FormView3.rules"
                    :span="24"
                    :gutter="0"
                    ref="myForm3"
                    :isFieldInline="false"
                    @submit="onSubmit"
                    @reset="onReset"
                >
                    <div slot="sp">
                        <el-rate v-model="FormView3.model.rate"></el-rate>
                    </div>
                    <div class="name-append" slot="name-append">
                        <el-button>获取短信验证码</el-button>
                    </div>
                    <div slot="desc-append">
                        提示： 这里的文字不能包含特殊字符
                    </div>
                    <div slot="footer">
                        <el-button type="primary">保存</el-button>
                        <el-button type="primary">发布</el-button>
                        <el-button type="">预览</el-button>
                        <el-button type="" @click="handleReset">重置</el-button>
                    </div>
                </sg-data-form>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'DemoForm',
        components: {},
        data() {
            return {
                FormView1: {
                    model: {
                        status: '1',
                        resourceName: '222',
                    },
                    fields: [
                        {
                            fieldType: 'slot',
                            slotName: 'sp',
                            label: '特殊组件',
                            class: 'form-item-sp',
                        },
                        {
                            slotName: 'status',
                            class: 'form-item-status',
                        },
                        {
                            fieldType: 'date',
                            type: 'daterange',
                            name: 'date',
                            label: '操作日期',
                            placeholder: '事实上',
                            'value-format': 'yyyy-MM-dd',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                            //value: ['2020-12-1', '2020-12-10'],
                        },
                        {
                            fieldType: 'input',
                            name: 'resourceName',
                            label: '资源名称',
                            placeholder: '请输入',
                            value: '初始值',
                        },
                        {
                            fieldType: 'input',
                            name: 'loginName',
                            label: '登录名',
                            placeholder: '请输入',
                        },
                        {
                            fieldType: 'select',
                            name: 'resourceType',
                            label: '资源类型',
                            placeholder: '请选择',
                            options: [
                                {
                                    label: 'url',
                                    value: '1',
                                },
                                {
                                    label: 'dom',
                                    value: '2',
                                },
                            ],
                        },
                        {
                            fieldType: 'input',
                            name: 'resourceName1',
                            label: '资源名称12',
                            placeholder: '请输入',
                            visible: false,
                        },
                        {
                            span(rows) {
                                if (rows[0].fields.length > 3) {
                                    return 24
                                } else {
                                    return 8
                                }
                            },
                            fieldType: 'action',
                            value: [
                                {
                                    isSubmit: true,
                                    type: 'primary',

                                    text: '查询',
                                },
                                {
                                    isReset: true,
                                    type: '',
                                    text: '重置',
                                },
                                {
                                    isMore: true,
                                    type: '',
                                    text: '更多条件',
                                },
                            ],
                        },
                    ],
                },
                FormView2: {
                    model: {
                        resource: '',
                        rate: 4,
                        xxx: '不能改',
                    },
                    rules: {
                        name: [
                            {
                                required: true,
                                message: '请输入活动名称',
                                trigger: 'blur',
                            },
                            {
                                min: 3,
                                max: 5,
                                message: '长度在 3 到 5 个字符',
                                trigger: 'blur',
                            },
                        ],
                        region: [
                            {
                                required: true,
                                message: '请选择活动区域',
                                trigger: 'change',
                            },
                        ],

                        type: [
                            {
                                type: 'array',
                                required: true,
                                message: '请至少选择一个活动性质',
                                trigger: 'blur',
                            },
                        ],
                        resource: [
                            {
                                required: true,
                                message: '请选择活动资源',
                                trigger: 'change',
                            },
                        ],
                        desc: [
                            {
                                required: true,
                                message: '请填写活动形式',
                                trigger: 'blur',
                            },
                        ],
                    },

                    fields: [
                        {
                            fields: [
                                {
                                    fieldType: 'slot',
                                    slotName: 'sp',
                                    span: 24,

                                    name: 'sp',
                                    label: '特殊组件',
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    fieldType: 'input',
                                    name: 'name',
                                    label: '活动名称',
                                    placeholder: '请输入',
                                    slotName: 'name-input-append',
                                    slotType: 'suffix',
                                },
                                {
                                    fieldType: 'select',
                                    name: 'region',
                                    label: '活动区域',
                                    placeholder: '请选择',
                                    options: [
                                        {
                                            label: '区域一',
                                            value: '1',
                                        },
                                        {
                                            label: '区域二',
                                            value: '2',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    fieldType: 'input',
                                    name: 'phone',
                                    label: '手机号码',
                                    placeholder: '请输入',
                                },
                                {
                                    fieldType: 'radio',
                                    name: 'resource',
                                    label: '特殊资源',

                                    options: [
                                        {
                                            label: '线上品牌赞助',
                                            value: '1',
                                        },
                                        {
                                            label: '线下场地免费',
                                            value: '2',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    span: 8,
                                    fieldType: 'select',
                                    name: 'province',
                                    label: '省份',
                                    placeholder: '请选择',
                                    onChange: async res => {
                                        const { value } = res
                                        this.FormView2.model.city = ''
                                        const result = await this.fetchCityData(
                                            {
                                                value,
                                            },
                                        )
                                        this.$refs['myForm'].setFieldData(
                                            'city',
                                            result,
                                        )
                                    },
                                    options: () => {
                                        return this.fetchProvinceData()
                                    },
                                },
                                {
                                    span: 8,
                                    fieldType: 'select',
                                    name: 'city',
                                    label: '市',
                                    placeholder: '请选择',
                                    onChange: async ({ value }) => {
                                        this.FormView2.model.district = ''
                                        const result = await this.fetchDistrictData(
                                            {
                                                value,
                                            },
                                        )
                                        this.$refs['myForm'].setFieldData(
                                            'district',
                                            result,
                                        )
                                    },
                                    options: [],
                                },
                                {
                                    span: 8,
                                    fieldType: 'select',
                                    name: 'district',
                                    label: '区域',
                                    placeholder: '请选择',
                                    options: [],
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    fieldType: 'checkbox',
                                    name: 'type',
                                    span: 24,
                                    label: '活动性质',

                                    options: [
                                        {
                                            label: '美食/餐厅线上活动',
                                            value: '1',
                                        },
                                        {
                                            label: '地推活动',
                                            value: '2',
                                        },
                                        {
                                            label: '线下主题活动',
                                            value: '3',
                                        },
                                        {
                                            label: '单纯品牌曝光',
                                            value: '4',
                                        },
                                        {
                                            label: '少时诵诗书萨达大所多',
                                            value: '5',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    fieldType: 'input',

                                    name: 'xxx',
                                    disabled: true,
                                    span: 24,
                                    label: '只读字段',
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    fieldType: 'input',
                                    type: 'textarea',
                                    name: 'desc',
                                    class: 'form-item-desc',
                                    span: 24,
                                    label: '请填写活动的形式是怎么少时诵诗书',
                                    maxlength: 100,
                                    'show-word-limit': true,
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    span: 24,
                                    fieldType: 'action',
                                    value: [
                                        {
                                            isSubmit: true,
                                            type: 'primary',

                                            text: '提交',
                                        },
                                        {
                                            isReset: true,
                                            type: '',
                                            text: '重置',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                FormView3: {
                    model: {
                        resource: '',
                        rate: 4,
                        xxx: '不能改',
                    },
                    rules: {
                        name: [
                            {
                                required: true,
                                message: '请输入活动名称',
                                trigger: 'blur',
                            },
                            {
                                min: 3,
                                max: 5,
                                message: '长度在 3 到 5 个字符',
                                trigger: 'blur',
                            },
                        ],
                        region: [
                            {
                                required: true,
                                message: '请选择活动区域',
                                trigger: 'change',
                            },
                        ],

                        type: [
                            {
                                type: 'array',
                                required: true,
                                message: '请至少选择一个活动性质',
                                trigger: 'blur',
                            },
                        ],
                        resource: [
                            {
                                required: true,
                                message: '请选择活动资源',
                                trigger: 'change',
                            },
                        ],
                        desc: [
                            {
                                required: true,
                                message: '请填写活动形式',
                                trigger: 'blur',
                            },
                        ],
                    },

                    fields: [
                        {
                            fieldType: 'slot',
                            slotName: 'sp',
                            name: 'sp',
                            label: '特殊组件',
                        },
                        {
                            fieldType: 'input',
                            name: 'name',
                            label: '活动名称',
                            placeholder: '请输入',
                            slotType: 'appendSlot',
                            class: 'form-item-name',
                            slotName: 'name-append',
                        },
                        {
                            fieldType: 'select',
                            name: 'region',
                            label: '活动区域',
                            placeholder: '请选择',
                            options: [
                                {
                                    label: '区域一',
                                    value: '1',
                                },
                                {
                                    label: '区域二',
                                    value: '2',
                                },
                            ],
                        },
                        {
                            fieldType: 'radio',
                            name: 'resource',
                            label: '特殊资源',

                            options: [
                                {
                                    label: '线上品牌赞助',
                                    value: '1',
                                },
                                {
                                    label: '线下场地免费',
                                    value: '2',
                                },
                            ],
                        },

                        {
                            fieldType: 'input',
                            type: 'textarea',
                            name: 'desc',
                            label: '请填写活动的形式是怎么少时诵诗书',

                            slotType: 'appendSlot',
                            slotName: 'desc-append',
                        },
                    ],
                },
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        methods: {
            fetchProvinceData() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve([
                            {
                                label: '浙江省',
                                value: '1',
                            },
                            {
                                label: '湖南省',
                                value: '2',
                            },
                        ])
                    })
                })
            },
            fetchCityData({ value }) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if (value == 1) {
                            resolve([
                                {
                                    label: '杭州市',
                                    value: '1-1',
                                },
                                {
                                    label: '绍兴市',
                                    value: '1-2',
                                },
                            ])
                        } else if (value == 2) {
                            resolve([
                                {
                                    label: '长沙',
                                    value: '2-1',
                                },
                            ])
                        } else {
                            resolve([])
                        }
                    })
                })
            },
            fetchDistrictData({ value }) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if (value == '1-1') {
                            resolve([
                                {
                                    label: '拱墅区',
                                    value: '1',
                                },
                                {
                                    label: '滨江区',
                                    value: '2',
                                },
                            ])
                        } else {
                            resolve([])
                        }
                    })
                })
            },
            onSubmit() {
                this.$refs['myForm'].validate(valid => {
                    if (valid) {
                        this.$message.success('submit')
                    }
                })
            },
            onReset() {
                this.$message.success('reset')
            },
            onUpdate() {},
            handleReset() {
                this.$refs['myForm3'].reset()
            },
        },
    }
</script>

<style lang="less">
    .DemoForm {
        padding: 20px;
        .example {
            margin-bottom: 20px;
            .result {
                background-color: #e5e5e5;
                padding: 10px 20px;
                margin-bottom: 30px;
            }
            border: 1px solid #ddd;
            min-height: 50px;
            padding: 12px;
        }
        .example-dialog {
            width: 800px;
            border: 1px solid red;
        }
        .form-item-status {
            text-align: center;
        }

        .form-item-desc .el-form-item__label {
            white-space: normal;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 20px;
            height: 40px;
        }

        .form-item-name .sg-data-form-field {
            display: flex;
            align-items: center;
            .el-button {
                vertical-align: top;
            }
            .name-append {
                margin-left: 10px;
            }
        }
    }
</style>
```
