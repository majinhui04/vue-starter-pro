<template>
    <!--查询结果 -->
    <div class="result console-container" :class="{ close: !myVisible }">
        <div class="result-collpse" @click.stop="handleToggleResult">
            <template v-if="!myVisible">
                <i class="el-icon-arrow-right"></i>
            </template>
            <template v-else>
                <i class="el-icon-arrow-left"></i>
            </template>
        </div>
        <div class="console-content">
            <!-- <sg-page-form
                ref="level1FormRef"
                :span="24"
                :inline="true"
                :rules="level1Form.rules"
                v-model="level1Form.query"
                @update="onLevel1FromInput"
                :field-list="level1Form.fieldList"
                label-width="150px"
            >
                <div slot="content" style="width:100%;">
                   
                <el-row type="flex" justify="center" slot="footer">
                    
                    <el-button
                        type="primary"
                        @click="handleLevel1Submit"
                        native-type="submit"
                        size="small"
                        >保存
                    </el-button>
                </el-row>
            </sg-page-form> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        auto: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {}
    },
    computed: {
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
    created() {
        console.log('created')
        //this.auto && this.onLoad({})
    },
    mounted() {
        // console.log(this.$attrs)
    },
    methods: {
        // 收起查询结果
        handleToggleResult(val) {
            this.myVisible = typeof val === 'boolean' ? val : !this.myVisible
        },
    },
}
</script>
<style lang="less">
.console-container {
    .console-content {
    }
}
</style>
