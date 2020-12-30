<template>
    <div class="sg-dataview-container" ref="wrap">
        <el-row type="flex" class="sg-row no-print" v-if="hasBar">
            <slot name="bar-head">
                <div class="sg-flex-1"></div>
            </slot>
            <slot name="bar">
                <div class="sg-table-bar no-print">
                    <el-select
                        v-if="sortOptions && sortOptions.length"
                        @change="onSortChange"
                        v-model="sort"
                        placeholder="请选择"
                        class="sg-sort-select"
                    >
                        <el-option
                            v-for="item in sortOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <el-button-group>
                        <el-button
                            title="刷新"
                            icon="el-icon-refresh"
                            @click="handleReload"
                        ></el-button>
                        <!-- <el-button icon="el-icon-s-grid"></el-button> -->
                        <el-popover
                            placement="bottom"
                            width="160"
                            v-model="operationVisible"
                        >
                            <!-- <div>
                                <el-checkbox :indeterminate="isIndeterminateColumn" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            </div> -->
                            <el-checkbox-group
                                class="sg-table-operation-wrap"
                                v-model="operation"
                                @change="onOperationChange"
                            >
                                <el-checkbox
                                    v-for="item in operations"
                                    :label="item.value"
                                    :key="item.value"
                                    >{{ item.label }}</el-checkbox
                                >
                            </el-checkbox-group>

                            <el-button
                                icon="el-icon-s-operation"
                                slot="reference"
                            ></el-button>
                        </el-popover>
                    </el-button-group>
                </div>
            </slot>
            <slot name="bar-foot"></slot>
        </el-row>
        <div class="sg-dataview-wrapper">
            <el-table
                :height="tableHeight"
                class="sg-table-container"
                v-loading="listLoading"
                :data="dataSource"
                style="width: 100%;"
                ref="table"
                v-bind="$attrs"
                v-on="$listeners"
            >
                <template v-for="(col, index) in columns">
                    <template v-if="col.type === 'selection'">
                        <el-table-column
                            :key="index"
                            type="selection"
                            :width="col.width"
                            align="center"
                            :selectable="handleSelectAble"
                        ></el-table-column>
                    </template>
                    <template v-else-if="col.type === 'index'">
                        <el-table-column
                            :key="index"
                            type="index"
                            :width="col.width || '50px'"
                            align="center"
                            :label="col.label"
                        ></el-table-column>
                    </template>
                    <template v-else-if="col.type === 'slot'">
                        <slot :name="col.name || col.prop"></slot>
                    </template>
                    <template v-else-if="col.slotName">
                        <el-table-column
                            :label="col.label"
                            :prop="col.prop"
                            :align="col.align || 'center'"
                            :key="index"
                            :type="col.type"
                            :width="col.width"
                            :fixed="col.fixed || false"
                        >
                            <template slot-scope="scope">
                                <slot
                                    :name="col.slotName"
                                    :row="scope.row"
                                    :$index="scope.$index"
                                ></slot>
                            </template>
                        </el-table-column>
                    </template>
                    <template v-else>
                        <el-table-column
                            :label="col.label"
                            :prop="col.prop"
                            :align="col.align || 'center'"
                            :key="index"
                            :type="col.type"
                            :width="col.width"
                            :fixed="col.fixed || false"
                        >
                            <template slot-scope="scope">
                                <ex-slot
                                    v-if="col.render"
                                    :render="col.render"
                                    :row="scope.row"
                                    :index="scope.$index"
                                    :column="col"
                                ></ex-slot>
                                <template v-else>
                                    <template
                                        v-if="
                                            col.tooltip && scope.row[col.prop]
                                        "
                                    >
                                        <el-tooltip
                                            popper-class="sg-table-tooltip"
                                            effect="light"
                                            :content="
                                                scope.row[col.prop] ||
                                                    defaultValue
                                            "
                                            placement="top-end"
                                        >
                                            <span
                                                :class="col.class"
                                                class="sg-table-txt-cut"
                                            >
                                                {{
                                                    scope.row[col.prop] ||
                                                        defaultValue
                                                }}
                                            </span>
                                        </el-tooltip>
                                    </template>
                                    <template v-else>
                                        <span :class="col.class">
                                            {{
                                                scope.row[col.prop] ||
                                                    defaultValue
                                            }}
                                        </span>
                                    </template>
                                </template>
                            </template>
                        </el-table-column>
                    </template>
                </template>
                <div class="" slot="empty">
                    <slot name="empty" v-if="!isVirgin">
                        暂无数据
                    </slot>
                    <slot name="virgin" v-else>
                        请先查询数据
                    </slot>
                </div>
            </el-table>
            <pagination
                v-if="pageVisible"
                :total="total"
                :page.sync="exPagination.page"
                :limit.sync="exPagination.pageSize"
                :pageSizes.sync="exPagination.pageSizes"
                @pagination="onLoad"
                class="no-print sg-pagination-container"
                :layout="exPagination.layout"
            >
                <div class="sg-flex-1 no-print" slot="page-header">
                    <slot name="page-header"> </slot>
                </div>
            </pagination>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Pagination from '../pagination/index.vue'
// 自定义内容的组件
const exSlot = {
    functional: true,
    props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null,
        },
    },

    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index,
        }

        if (ctx.props.column) params.column = ctx.props.column

        return h('div', [ctx.props.render(h, params)])
    },
}
export default {
    name: 'SgDataView',
    components: { Pagination, 'ex-slot': exSlot },
    props: {
        // table操作栏
        hasBar: {
            type: Boolean,
            default: false,
        },
        // 默认值
        defaultValue: {
            type: String,
            default: '-',
        },
        // 排序
        sortOptions: {
            type: Array,
            default() {
                return []
            },
        },
        // 列
        columns: {
            type: Array,
            default() {
                return []
            },
        },
        // 第一次是否自动请求
        auto: {
            type: Boolean,
            default: true,
        },
        // 是否需要分页
        pageVisible: {
            type: Boolean,
            default: true,
        },
        // 分页配置
        pagination: {
            type: Object,
            default() {
                return {}
            },
        },
        // 数据请求
        load: {
            type: Function,
            default() {
                return []
            },
        },
        // table最小高度
        minHeight: {
            type: Number,
            default: 200,
        },
        // 页面留白高度
        spaceHeight: {
            type: Number,
            default: 120,
        },
        // 是否自动计算高度
        isAutoHeight: {
            type: Boolean,
            default: false,
        },
        handleSelectAble: {
            type: Function,
            default() {
                return true
            },
        },
    },
    data() {
        return {
            sortParams: {},
            sort: '', // 默认排序值
            operationVisible: false, // 列
            tableHeight: null,
            isVirgin: true,
            total: 0,
            listLoading: false,
            dataSource: [],
            myColumns: [],
            operations: [],
            operation: [],
            multipleSelection: [],
        }
    },
    computed: {
        exAttrs() {
            const config = this.$ShareGood || {}
            const DataViewConfig = config.DataView || {}
            const attrs = this.$attrs || {}
            const defaults = {
                border: true,
                fit: true,
            }
            return {
                ...defaults,
                ...DataViewConfig,
                ...attrs,
            }
        },
        exPagination() {
            const config = this.$ShareGood || {}
            const myConfig = config.DataView || {}
            const gPageConfig = myConfig.pagination || {}
            const pageConfig = this.pagination

            const result = {
                pageSize: 20,
                visible: true,
                page: 1,
                pageSizes: [10, 20, 50, 100],
                layout: 'total, sizes, prev, pager, next, jumper',
                ...gPageConfig,
                ...pageConfig,
            }
            // console.log('exPagination', result)
            return result
        },
    },
    created() {
        this.myColumns = [...this.columns]
        this.operations = this.columns
            .map(item => {
                if (item.prop) {
                    return {
                        checked: true,
                        label: item.label,
                        value: item.prop,
                    }
                } else {
                    return null
                }
            })
            .filter(item => item)

        this.operation = this.operations.map(item => item.value)

        this.auto && this.onLoad({})
    },
    mounted() {
        this.isAutoHeight && this.calcHeight()
    },
    methods: {
        // 排序
        onSortChange(val) {
            const target = this.sortOptions.filter(
                item => item.value === val,
            )[0]
            const { key, value } = target
            const params = {
                page: 1,
            }
            this.sortParams[key] = value
            console.log(111, this.sortParams)
            this.onLoad(params)
        },
        // 刷新
        handleReload() {
            this.onLoad()
        },
        //
        onOperationChange() {
            //this.onLoad({ page: 1 })
        },
        onOperationChange(val) {
            this.columns = this.myColumns
                .map(item => {
                    if (
                        val.indexOf(item.prop) > -1 ||
                        item.type === 'selection'
                    ) {
                        return item
                    } else {
                        return null
                    }
                })
                .filter(item => item)
        },
        // 计算tabel高度
        calcHeight() {
            let H = window.innerHeight
            let minHeight = this.minHeight
            let wrapHeight = this.$refs.wrap.getBoundingClientRect().top
            let height = null
            //height = H - wrapHeight - Number(this.spaceHeight)
            height = H - Number(this.spaceHeight)

            this.tableHeight = Math.max(minHeight, height)
        },

        scrollTop() {
            this.$nextTick(() => {
                try {
                    let $el = this.$refs.table.$el,
                        $wrap = $el.getElementsByClassName(
                            'el-table__body-wrapper',
                        )[0]
                    $wrap && ($wrap.scrollTop = 0)
                } catch (e) {
                    console.log(e)
                }
            })
        },
        // 加载数据
        onLoad(params = {}) {
            let page = params.page
            let paramsSerializer = this.exPagination.paramsSerializer
            params.pageSize = params.pageSize || this.exPagination.pageSize
            if (page) {
                this.exPagination.page = page
            } else {
                page = this.exPagination.page
            }
            // console.log('page', page)
            this.listLoading = true
            Object.assign(params, this.sortParams)
            params = paramsSerializer ? paramsSerializer(params) : params
            this.load(params)
                .then(({ result, total }) => {
                    this.dataSource = result
                    this.total = total || 0
                    this.listLoading = false
                    this.isVirgin = false

                    this.scrollTop()
                })
                .catch(err => {
                    console.error('[data-view load]', err)
                    this.dataSource = []
                    this.total = 0
                    this.listLoading = false
                    this.isVirgin = false
                    this.scrollTop()
                })
        },
    },
}
</script>
