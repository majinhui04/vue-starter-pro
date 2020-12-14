<template>
    <div class="menu sg-flexbox align-center">
        <div
            class="icon-btn"
            @click="handlePaint('多边形')"
            :class="{ active: myAction === '多边形' }"
        >
            <svg-icon icon="多边形" class="icon" />
        </div>
        <!-- <div class="icon-btn">
            <svg-icon icon="方形" class="icon" />
        </div> -->
        <div
            class="icon-btn"
            @click="handlePaint('圆形')"
            :class="{ active: myAction === '圆形' }"
        >
            <svg-icon icon="圆形" class="icon" />
        </div>
        <!-- <div class="icon-btn">
            <svg-icon icon="拖动" class="icon" />
        </div> -->
        <div class="icon-btn" @click="reset">
            <svg-icon icon="清除" class="icon" />
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['action'],
    data() {
        return {}
    },
    mounted() {},
    computed: {
        myAction: {
            get() {
                return this.action
            },
            set(val) {
                this.$emit('update:action', val)
            },
        },
    },
    methods: {
        handlePaint(action) {
            this.myAction = action
            this.$emit('paint', action)
        },
        reset() {
            this.$emit('reset')
        },
    },
}
</script>
