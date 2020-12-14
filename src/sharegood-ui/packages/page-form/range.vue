<template>
    <el-form-item :label="label" :prop="name">
        <span>{{ myMin }}{{ myMax }}</span>
        <el-input
            v-model.number="min"
            @input="onInput"
            class="sg-range-input"
        ></el-input>
        <span class="sg-range-gap">至</span>
        <el-input
            v-model.number="max"
            @input="onInput"
            class="sg-range-input"
        ></el-input>
    </el-form-item>
</template>

<script>
import formMixins from './form-model'

export default {
    name: 'range',
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
            min: '',
            max: '',
            currentValue: this.value,
        }
    },
    computed: {
        myMin() {
            let val = this.value
            if (val && val[0] != undefined) {
                this.min = val[0]
            } else {
                this.min = ''
            }
            return ''
        },
        myMax() {
            let val = this.value
            if (val && val[1] != undefined) {
                this.max = val[1]
            } else {
                this.max = ''
            }
            return ''
        },
    },
    mounted() {},
    methods: {
        onInput() {
            let min = this.min
            let max = this.max
            this.$emit('input', this.name, [min, max])
        },
    },
}
</script>
