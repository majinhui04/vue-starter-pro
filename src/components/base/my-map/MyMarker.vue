<template>
    <bm-marker
        :position="{ lng: 116.404, lat: 39.915 }"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
    >
        <bm-label
            content="我爱北京天安门"
            :labelStyle="{ color: 'red', fontSize: '24px' }"
            :offset="{ width: -35, height: 30 }"
        />
    </bm-marker>
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
            el.style.left = pixel.x - 60 + 'px'
            el.style.top = pixel.y - 20 + 'px'
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
    height: 200px;

    overflow-y: auto;
}
.sample.active {
    /* background: rgba(0, 0, 0, 0.75);
    color: #fff; */
}
</style>
