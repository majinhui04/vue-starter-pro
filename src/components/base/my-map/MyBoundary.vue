<template>
    <bm-control>
        <bm-boundary
            name="嘉兴市海宁市海宁市"
            fillColor=""
            :strokeWeight="4"
            strokeColor="blue"
            @mouseout="mouseout"
        ></bm-boundary>
    </bm-control>
</template>

<script>
export default {
    props: {},
    mounted() {},
    methods: {
        mouseout() {
            this.$emit('mouseout')
        },
    },
}
</script>
