<template>
    <span>
        <el-button> </el-button>
    </span>
</template>

<script>
export default {
    name: 'MyButton',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
    },
    data() {
        return {
            currentValue: this.value,
        }
    },
}
</script>
