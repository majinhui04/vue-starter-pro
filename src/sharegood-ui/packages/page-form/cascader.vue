<template>
    <el-form-item :label="label" :prop="name">
        <el-cascader
            v-model="currentValue"
            @input="onInputEvent"
            :options="dataList"
            :collapse-tags="true"
            v-bind="$attrs"
        ></el-cascader>
    </el-form-item>
</template>

<script>
import formMixins from './form-model'

export default {
    name: 'cascader',
    props: {
        value: {
            type: [String, Number, Array],
            default: null,
        },
        options: {
            type: [Array, Function],
            default() {
                return []
            },
        },
    },
    mixins: [formMixins],
    data() {
        return {
            dataList: [],
            currentValue: this.value,
        }
    },
    mounted() {
        if (Array.isArray(this.options)) {
            this.dataList = this.options
        } else {
            const result = this.options()
            if (result.then) {
                result
                    .then(list => {
                        this.dataList = list
                    })
                    .catch(err => {
                        console.error(err)
                    })
            } else {
                this.dataList = result
            }
        }
    },
}
</script>
