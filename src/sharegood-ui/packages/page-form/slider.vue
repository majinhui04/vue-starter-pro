<template>
    <el-form-item :label="label" :prop="name">
        <el-slider
            show-stops
            show-tooltip
            :value="currentValue"
            @input="onInputEvent"
            range
            v-bind="$attrs"
        >
        </el-slider>
    </el-form-item>
</template>

<script>
import formMixins from './form-model'

export default {
    name: 'MySlider',
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
            marks: {
                0: '0°C',
                8: '8°C',
                37: '37°C',
                50: {
                    style: {
                        color: '#1989FA',
                    },
                    label: this.$createElement('strong', '50%'),
                },
            },
        }
    },
}
</script>
