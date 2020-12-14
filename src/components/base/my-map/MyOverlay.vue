<template>
    <bm-overlay
        ref="customOverlay"
        class="sample"
        pane="labelPane"
        @draw="draw"
    >
        <slot></slot>
    </bm-overlay>
</template>

<script>
export default {
    props: ['text', 'position', 'active'],
    watch: {
        position: {
            handler() {
                this.$refs.customOverlay.reload()
            },
            deep: true,
        },
    },
    methods: {
        handleClick() {
            global.alert('Well done.')
        },
        draw({ el, BMap, map }) {
            const { lng, lat } = this.position
            const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
            el.style.left = pixel.x + 10 + 'px'
            el.style.top = pixel.y - 80 + 'px'
        },
    },
}
</script>

<style>
.sample {
    width: 220px;

    line-height: 40px;
    background: rgba(0, 0, 0, 0.5);
    /* box-shadow: 0 0 5px #000; */
    color: #fff;
    text-align: left;
    padding: 10px;
    position: absolute;
    height: 400px;

    overflow-y: auto;
}
.sample.active {
    /* background: rgba(0, 0, 0, 0.75);
    color: #fff; */
}
</style>
