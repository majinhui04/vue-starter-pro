<template>
    <div class="content">
        <sg-page-form
            :rules="rules"
            :ref-obj.sync="ref"
            :gutter="10"
            :span="8"
            :inline="true"
            v-model="query"
            :field-list="queryInfo.fieldList"
            label-width="120px"
            on-submit-text="查询"
            @submit="onSearch"
        >
            <el-col :span="8" slot="avatar">
                <el-form-item label="头像" prop="avatar" class="el-form-block">
                    <el-input v-model="query.avatar"></el-input>
                </el-form-item>
            </el-col>
        </sg-page-form>

        <el-row type="flex" justify="center">
            {{ JSON.stringify(query) }}
        </el-row>
    </div>
</template>

<script>
const pickerOptions = {
    disabledDate(time) {
        return time.getTime() > Date.now()
    },
    shortcuts: [
        {
            text: '今天',
            onClick(picker) {
                picker.$emit('pick', new Date())
            },
        },
        {
            text: '昨天',
            onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
            },
        },
        {
            text: '一周前',
            onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
            },
        },
    ],
}
export default {
    name: 'Crud',
    components: {},
    data() {
        return {
            rules: {},
            ref: null,
            a: '111',
            query: {
                account: '',
                endTime: '2019/09/01',
                phone: '13456525308',
            },
            // 文章相关
            articleInfo: {
                account: '',
                endTime: '2019/09/01',
                phone: '13456525308',
            },
            // 查询
            queryInfo: {
                data: {},
                fieldList: [
                    {
                        name: 'account',
                        label: '账号',
                        placeholder: '请输入账号',
                        fieldType: 'input',
                        class: 'form-item-account',
                    },
                    {
                        name: 'avatar',
                        fieldType: 'slot',
                    },
                    {
                        name: 'endTime',
                        label: '截止时间',
                        type: 'datetime',
                        'value-format': 'yyyy-MM-dd',
                        format: 'yyyy-MM-dd',
                        fieldType: 'date',
                        pickerOptions: {
                            ...pickerOptions,
                        },
                    },
                    // {
                    //     name: 'updatetime',
                    //     label: '时间范围',
                    //     type: 'datetimerange',
                    //     'value-format': 'yyyy-MM-dd HH:mm:ss',
                    //     format: 'yyyy-MM-dd',
                    //     fieldType: 'date',
                    //     defaultTime: ['00:00:00', '23:59:59'],
                    //     // pickerOptions: {
                    //     //     ...pickerOptions,
                    //     // },
                    // },
                    {
                        name: 'sex',
                        label: '性别',
                        // multiple: true,
                        // size: 'mini',
                        fieldType: 'select',
                        options: [
                            {
                                label: '男1',
                                value: 1,
                            },
                            {
                                label: '女',
                                value: 2,
                            },
                        ],
                    },
                    {
                        name: 'phone',
                        label: '手机号码',
                        fieldType: 'input',
                    },
                    {
                        name: 'endTime111',
                        label: '截止时间ssksskssss萨克斯',
                        type: 'datetime',
                        fieldType: 'date',
                    },
                    {
                        name: 'test',
                        label: 'sksss',
                        fieldType: 'input',
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
        onSearch() {
            this.ref.validate(valid => {
                if (valid) {
                    this.$message.success('ok')
                } else {
                    this.$message.error('eorr')
                }
            })
        },
    },
}
</script>

<style lang="less">
.Crud {
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

//

// .el-col {
//     border: 1px solid #ddd;
// }
</style>
