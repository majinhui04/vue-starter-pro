<template>
    <div class="my-map-nav-container">
        <div class="nav-list">
            <div class="nav-item header-menu-withmore">
                <span>区域 <i class="el-icon-arrow-down"></i></span>
                <div class="menu-list hide">
                    <div class="nav-content-body">
                        <div class="query-list">
                            <my-query
                                ref="area"
                                v-model="query[item.name]"
                                v-for="(item, index) in fields_area"
                                :key="index"
                                v-bind="item"
                            ></my-query>
                        </div>
                    </div>
                    <el-row class="action sg-row" type="flex" justify="center">
                        <el-button type="primary" @click="handleSubmit"
                            >确定</el-button
                        >
                        <el-button type="primary" @click="handleReset('area')"
                            >重置</el-button
                        >
                    </el-row>
                </div>
            </div>

            <div class="nav-item  header-menu-withmore">
                <span>营销状态 <i class="el-icon-arrow-down"></i></span>
                <div class="menu-list hide market">
                    <div class="nav-content-body">
                        <div class="query-list">
                            <my-query
                                ref="status"
                                v-model="query[item.name]"
                                v-for="(item, index) in fields_status"
                                :key="index"
                                v-bind="item"
                            ></my-query>
                        </div>
                    </div>
                    <el-row class="action sg-row" type="flex" justify="center">
                        <el-button type="primary" @click="handleSubmit"
                            >确定</el-button
                        >
                        <el-button type="primary" @click="handleReset('status')"
                            >重置</el-button
                        >
                    </el-row>
                </div>
            </div>
            <div
                class="nav-item header-menu-withmore"
                :class="{ active: isMoreFocus }"
            >
                <span>更多 <i class="el-icon-arrow-down"></i></span>
                <div class="menu-list hide more">
                    <div class="nav-content-body">
                        <div class="query-list">
                            <my-query
                                ref="more"
                                v-model="query[item.name]"
                                v-for="(item, index) in fields"
                                :key="index"
                                v-bind="item"
                            >
                                <template slot="$entEstDate">
                                    <el-date-picker
                                        value-format="yyyy-MM-dd"
                                        @change="onDateChange"
                                        v-model="query['$entEstDate']"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions"
                                        @focus="onDateFocus"
                                        @blur="onDateBlur"
                                    >
                                    </el-date-picker>
                                </template>
                            </my-query>
                        </div>
                    </div>
                    <el-row class="action sg-row" type="flex" justify="center">
                        <el-button type="primary" @click="handleSubmit"
                            >确定</el-button
                        >
                        <el-button type="primary" @click="handleReset('more')"
                            >重置</el-button
                        >
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyQuery from './MyQuery'
export default {
    components: {
        MyQuery,
    },
    data() {
        const now = new Date().getTime()
        return {
            isMoreFocus: false,
            date: '',
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7,
                            )
                            picker.$emit('pick', [start, end])
                        },
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30,
                            )
                            picker.$emit('pick', [start, end])
                        },
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90,
                            )
                            picker.$emit('pick', [start, end])
                        },
                    },
                ],
            },
            action: '',
            fields_status: [
                {
                    label: '营销状态',
                    name: '$$bussinessSate',
                    type: 'checkbox',
                    result: [
                        {
                            label: '信贷客户',
                            value: '1',
                        },
                        {
                            label: '结算客户',
                            value: '2',
                        },
                        {
                            label: '潜在客户',
                            value: '3',
                        },
                        {
                            label: '预警客户',
                            value: '4',
                        },
                        {
                            label: '出险客户',
                            value: '5',
                        },
                    ],
                },
            ],
            fields_area: [
                {
                    label: '区域',
                    name: 'entDomdistrict',
                    type: 'radio',
                    result: [],
                },
            ],
            fields: [
                {
                    label: '(多选) 注册资本',
                    name: '$$entRegCap',
                    type: 'checkbox',
                    result: [
                        {
                            label: '0-50万',
                            value: '1',
                        },
                        {
                            label: '50-500万',
                            value: '2',
                        },
                        {
                            label: '500-3000万',
                            value: '3',
                        },
                        {
                            label: '3000-5亿',
                            value: '4',
                        },
                        {
                            label: '5亿以上',
                            value: '5',
                        },
                    ],
                },
                {
                    label: '成立日期',
                    name: '$entEstDate',
                    type: 'radio',
                    result: [
                        {
                            label: '近3天',
                            value: [
                                this.$utils.dateFormat(
                                    now - 3600 * 1000 * 24 * 3,
                                ),
                                this.$utils.dateFormat(now),
                            ],
                        },
                        {
                            label: '近10天',
                            value: [
                                this.$utils.dateFormat(
                                    now - 3600 * 1000 * 24 * 10,
                                ),
                                this.$utils.dateFormat(now),
                            ],
                        },
                        {
                            label: '近30天',
                            value: [
                                this.$utils.dateFormat(
                                    now - 3600 * 1000 * 24 * 30,
                                ),
                                this.$utils.dateFormat(now),
                            ],
                        },
                    ],
                },
                {
                    label: '(多选) 所属行业',
                    name: '$$hydm',
                    type: 'checkbox',
                    result: [],
                },
                {
                    label: '经营状态',
                    name: 'regstateLx',
                    type: 'radio',
                    result: this.$getOptions('regstateLx'),
                },
                {
                    label: '是否科技企业',
                    name: 'kjlqy',
                    type: 'radio',
                    result: this.$getOptions('kjlqy'),
                },
                {
                    label: '是否规上企业',
                    name: 'gsqy',
                    type: 'radio',
                    result: this.$getOptions('gsqy'),
                },
                {
                    label: '是否有不动产抵押',
                    name: 'sfbdcdy',
                    type: 'radio',
                    result: this.$getOptions('sfbdcdy'),
                },
                {
                    label: '是严重失信企业',
                    name: 'yzsxqy',
                    type: 'radio',
                    result: this.$getOptions('yzsxqy'),
                },
                {
                    label: '亩均论英雄',
                    name: 'mclyxjb',
                    type: 'radio',
                    result: this.$getOptions('mclyxjb'),
                },
                {
                    label: '资产负债率',
                    name: 'zcfzl',
                    type: 'radio',
                    result: this.$getOptions('zcfzl'),
                },
                {
                    label: '销售额',
                    name: 'xsgm',
                    type: 'radio',
                    result: this.$getOptions('xsgm'),
                },
                {
                    label: '销售增长率',
                    name: 'xszzl',
                    type: 'radio',
                    result: this.$getOptions('xszzl'),
                },
                {
                    label: '纳税总额增长率',
                    name: 'nszzl',
                    type: 'radio',
                    result: this.$getOptions('nszzl'),
                },
                {
                    label: '电量同比增幅',
                    name: 'dltbzzl',
                    type: 'radio',
                    result: this.$getOptions('dltbzzl'),
                },
                {
                    label: '出口额',
                    name: 'ckgmD',
                    type: 'radio',
                    result: this.$getOptions('ckgmD'),
                },
            ],
            query: {},
        }
    },
    computed: {},
    async created() {
        const street = await this.$api.get_street_options()
        let industry_list = await this.$api.get_industry_list()
        this.fields_area[0].result = street
        let industry = industry_list.map(item => {
            return [...item.children]
        })
        this.fields[2].result = industry.flat(Infinity)
    },
    mounted() {
        // document.documentElement.addEventListener('click', this.onBlur, false)
    },
    beforeDestroy() {
        // console.log('destroyed')
        // document.documentElement.removeEventListener(
        //     'click',
        //     this.onBlur,
        //     false,
        // )
    },
    methods: {
        onDateBlur() {
            setTimeout(() => {
                this.isMoreFocus = false
            }, 500)
        },
        onDateFocus() {
            this.isMoreFocus = true
        },
        onBlur(e) {
            let isOut = true
            let target = e.target
            let parentNode = target.parentNode
            while (parentNode) {
                let className = parentNode.className || ''
                if (className.indexOf('nav-content') > -1) {
                    isOut = false
                }
                parentNode = parentNode.parentNode
            }

            if (isOut) {
                this.action = ''
            }
            //this.action = ''
        },
        onDateChange(value) {
            console.log(value)
            const query = this.query
            query['$entEstDate'] = value
        },
        onLeave() {
            console.log('onLeave')
        },
        onHover(action) {
            this.action = action
            // document.documentElement.removeEventListener(
            //     'mousedown',
            //     this.onBlur,
            // )
            console.log(1, action)
        },
        handleReset(action) {
            if (action === 'more') {
                this.date = ''
            }
            this.$refs[action].forEach(item => {
                item.reset()
            })
        },
        handleSubmit() {
            console.log('handleSubmit', this.query)
            this.$emit('submit', this.query)
            this.action = ''
        },
    },
}
</script>

<style lang="less">
.my-map-nav-container {
    height: 100%;
    position: relative;
    flex: 1;
    margin-left: 30px;
    .nav-content {
        box-shadow: 0px 5px 25px 5px rgba(0, 0, 0, 0.19);
        position: absolute;
        z-index: 100;
        left: 0;
        top: 60px;
        background-color: #fff;
        width: 800px;
    }
    .nav-content-body {
        min-height: 150px;
        max-height: 300px;
        overflow-y: auto;
    }
    .nav-list {
        height: 100%;
        display: flex;
        align-items: center;
        .nav-item {
            font-size: 16px;
            padding: 0 15px;
            height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            z-index: 100;
            &:hover {
                background-color: #fff;
            }
            &.active {
                background-color: #fff;
            }
        }
    }

    .query-item {
        display: flex;
        border-bottom: 1px solid #ddd;
        .query-label {
            width: 150px;
            padding: 7px 7px;
            line-height: 28px;
            text-align: right;
            color: #666;
            // background: rgba(243, 243, 243, 1);
        }
        .query-content {
            flex: 1;
            padding: 7px 7px;
        }
    }

    .el-checkbox.is-bordered + .el-checkbox.is-bordered {
        margin-left: 0;
    }
    .el-radio.is-bordered + .el-radio.is-bordered {
        margin-left: 0;
    }
    .el-checkbox,
    .el-radio {
        margin-bottom: 7px;
    }
    .el-checkbox__input,
    .el-radio__input {
        display: none;
    }

    .action {
        padding: 15px;
        // box-shadow: 0px 5px 25px 5px rgba(0, 0, 0, 0.19);
    }

    .header-menu-withmore {
        cursor: pointer;
        height: 100%;
        position: relative;

        &:hover,
        &.active {
            background: #444;
            color: #ffe300;

            .menu-list {
                display: block;
            }
        }
        .menu-list-box {
            display: inline-block;
            padding: 0 24px;
        }
    }
    .menu-list {
        font-size: 14px;
        left: 0;
        width: 600px;
        padding: 6px 0;
        position: absolute;
        background: #fff;
        top: 60px;
        border-radius: 0 0 4px 4px;
        box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.2);
        color: #444;
        z-index: 14;

        &.market {
            left: -80px;
            width: 650px;
        }
        &.more {
            left: -400px;
            width: 800px;
        }
    }
    .hide {
        display: none;
    }
    .show {
        display: block !important;
    }
}
</style>
