<template>
    <!--查询结果 -->
    <div class="result" :class="{ close: !myVisible }">
        <div class="result-collpse" @click.stop="handleToggleResult">
            <template v-if="!myVisible">
                <i class="el-icon-arrow-right"></i>
            </template>
            <template v-else>
                <i class="el-icon-arrow-left"></i>
            </template>
        </div>
        <div class="result-head">
            <template v-if="currentBank.name">
                <div class="sg-row" style="margin-bottom:0;">
                    <i
                        class="el-icon-location"
                        style="font-size:14px;color:red;"
                    ></i>
                    <span class="sg-color-gray-light" style="margin-right:7px;">
                        我的位置
                        <span>
                            附近有<b class="sg-color-primary">{{
                                pagination.total
                            }}</b
                            >家企业</span
                        >
                    </span>
                    <el-button size="mini" type="primary" @click="handleReset"
                        >重置</el-button
                    >
                </div>
                <div class="sg-row">
                    <b class="sg-color-primary" style="font-size:14px;">{{
                        currentBank.name
                    }}</b>
                </div>
                <div class="sg-row">电话：{{ currentBank.orgTel }}</div>
                <div class="sg-row sg-ellipsis">
                    地址：{{ currentBank.orgAddr }}
                </div>
            </template>
            <template v-else>
                <div class="sg-row">
                    <i
                        class="el-icon-location"
                        style="font-size:14px;color:red;"
                    ></i>
                    <span class="sg-color-gray-light">
                        我的位置
                        <span>
                            请选择一个支行
                        </span>
                    </span>
                </div>
            </template>
        </div>
        <div class="result-main">
            <div class="result-list">
                <div
                    class="result-item"
                    v-for="(item, index) in exResult"
                    :key="index"
                >
                    <div class="result-item-head sg-row">
                        <i class="result-marker marker" :class="item.$class">
                            <b>{{ item.$index }}</b></i
                        >
                        <div class="result-checkbox">
                            <el-checkbox
                                :checked="item.$checked"
                                v-model="item.$checked"
                            ></el-checkbox>
                        </div>
                        <div class="result-item-head-line ">
                            <span
                                class="title"
                                @click.stop="infoWindowOpen(item)"
                                >{{ item.entName }}</span
                            >
                            <a
                                :href="item.detailUrl"
                                target="_blank"
                                class="sg-color-link"
                                style="font-size:12px"
                                >详情»</a
                            >
                        </div>
                    </div>
                    <div class="result-item-main">
                        <div class="sg-row">
                            电话：<span>{{ item.tel }}</span>
                        </div>
                        <div class="sg-row">
                            地址：<span>{{ item.dom }}</span>
                        </div>
                        <div class="sg-row result-item-main-tags sg-flexbox ">
                            <el-tag
                                style="margin-right:3px"
                                v-for="(tag, index) in item.$tags"
                                :key="index"
                                :type="tag.type"
                                size="mini"
                                >{{ tag.label }}</el-tag
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="result-foot">
            <div class="result-page sg-flexbox align-center justify-center">
                <sg-pagination
                    style="margin-top:10px;margin-bottom:5px"
                    small
                    :background="false"
                    :total="exPagination.total"
                    :page.sync="exPagination.page"
                    :limit.sync="exPagination.limit"
                    layout="total,prev, pager, next"
                    @pagination="onPageChange"
                ></sg-pagination>
            </div>
            <div class="result-action sg-flexbox align-center justify-center">
                <el-checkbox
                    label="全选"
                    @change="onSelectAllChange"
                ></el-checkbox>
                <el-button
                    type="primary"
                    @click="handleOpenP('selected')"
                    style="margin-left:10px"
                    >保存至企业网格</el-button
                >
                <el-button type="primary" @click="handleOpenP('')"
                    >一键保存至企业网格</el-button
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        load: {
            type: Function,
            default() {
                return []
            },
        },
        visible: {
            type: Boolean,
            default: false,
        },
        auto: {
            type: Boolean,
            default: true,
        },
        //
        model: {
            type: Object,
            default: {
                result: {},
            },
        },
        result: {
            type: Array,
            default() {
                return []
            },
        },
        pagination: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            pDialog: {
                // 保存公司批次
                meta: {},
                visible: false,
            },
        }
    },
    computed: {
        exResult() {
            return [...this.result]
        },
        exPagination() {
            return {
                ...this.pagination,
            }
        },
        currentBank() {
            return {
                ...this.model,
            }
        },
        myVisible: {
            get() {
                console.log('myVisible', this.visible)
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            },
        },
    },
    created() {},
    mounted() {
        // console.log(this.$attrs)
    },
    methods: {
        infoWindowOpen(model) {
            console.log('infoWindowOpen', model)
            this.$emit('open', model)
        },
        handleReset() {
            this.$emit('reset')
        },
        // 收起查询结果
        handleToggleResult(val) {
            this.myVisible = typeof val === 'boolean' ? val : !this.myVisible
        },
        onPageChange({ page }) {
            this.$emit('page', { page })
        },
        // 结果全选
        onSelectAllChange(val) {
            console.log('onSelectAllChange', val)
            const { exResult } = this
            exResult.forEach(item => {
                item.$checked = val
            })
        },
        // 保存批次
        handleOpenP(action) {
            const { exResult: result } = this
            if (action === 'selected') {
                const selected = result
                    .filter(item => item.$checked)
                    .map(item => item.pripid)
                if (selected.length === 0) {
                    return this.$message.warning('请先选中企业')
                }
                this.$emit('save', [...selected])
            } else {
                this.$emit('save', null)
            }
        },

        // 保存一个公司
        handleSaveOne(target) {
            const selected = [target.pripid]

            this.pDialog.meta = {
                pripids: [...selected],
            }
            this.pDialog.visible = true
        },
    },
}
</script>
