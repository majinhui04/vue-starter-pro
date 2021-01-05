<template>
    <div class="sg-data-form-field">
        <el-input
            :value="currentValue"
            :clearable="clearable"
            @input="onInputEvent"
            v-bind="$attrs"
            v-on="$listeners"
            autocomplete="off"
        >
            <slot :slot="slotType" name="inputSlot"></slot>
        </el-input>
        <slot name="appendSlot"></slot>
    </div>
</template>

<script>
import formMixins from './form-model'

export default {
    name: 'MyInput',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        // 当前组件slot插槽类型prefix、suffix、prepend、append
        slotType: {
            type: String,
            default() {
                return ''
            },
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
