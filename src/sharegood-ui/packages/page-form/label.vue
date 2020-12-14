<template>
    <el-form-item :label="label" :prop="name">
        <label for="" v-html="currentValue" class="sg-label"></label>
    </el-form-item>
</template>

<script>
import formMixins from './form-model'

export default {
    name: 'MyLabel',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
    },
    mixins: [formMixins],
    data() {
        return {
            currentValue: this.value,
        }
    },
}
</script>
