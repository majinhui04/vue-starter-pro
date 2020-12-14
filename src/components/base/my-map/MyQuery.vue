<template>
    <div class="query-item">
        <div class="query-label">{{ label }}:</div>
        <div class="query-content">
            <template v-if="type === 'checkbox'">
                <el-checkbox
                    border
                    size="mini"
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全部</el-checkbox
                >
                <el-checkbox-group
                    v-model="checkList"
                    size="mini"
                    @change="handleCheckedChange"
                >
                    <el-checkbox
                        border
                        :label="item.value"
                        v-for="(item, index) in results"
                        :key="index"
                        >{{ item.label }}</el-checkbox
                    >
                </el-checkbox-group>
                <slot :name="name"></slot>
            </template>
            <template v-else>
                <el-radio-group v-model="radio" size="mini" @change="onChange">
                    <el-radio label="" border>全部</el-radio>
                    <el-radio
                        :label="item.value"
                        border
                        v-for="(item, index) in results"
                        :key="index"
                        >{{ item.label }}</el-radio
                    >
                </el-radio-group>
                <slot :name="name"></slot>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: ['type', 'label', 'value', 'result', 'name'],
    data() {
        return {
            checkAll: false,
            isIndeterminate: true,
            checkList: [],
            radio: '',
            currentValue: this.value,
        }
    },
    computed: {
        results() {
            return this.result
        },
    },
    watch: {
        value(val) {
            if (this.type === 'checkbox') {
                this.checkList = val
            } else {
                this.radio = val
            }
        },
    },
    methods: {
        reset() {
            this.radio = ''
            this.checkList = []
            this.isIndeterminate = true
            this.save()
        },
        handleCheckAllChange(val) {
            this.checkList = val ? this.result.map(item => item.value) : []
            this.isIndeterminate = false
            this.save()
        },
        handleCheckedChange(value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.result.length
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.result.length
            this.save()
        },
        save() {
            if (this.type === 'checkbox') {
                let result = this.checkList

                this.$emit('input', result)
            } else {
                this.$emit('input', this.radio)
            }
        },
        onChange() {
            this.save()
        },
    },
}
</script>

<style lang="less">
.my-map-nav-container {
    .query-content {
        display: flex;
        flex-wrap: wrap;
        .el-checkbox,
        .el-radio {
            margin-right: 15px;
        }
    }
}
</style>
