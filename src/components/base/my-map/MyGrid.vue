<template>
    <bm-control>
        <!-- 一级网格 -->
        <template v-if="level === 1">
            <template v-for="(item, index) in paths">
                <template v-if="item.type === 'circle'">
                    <bm-circle
                        :key="index"
                        :center="item.body.center"
                        :radius="item.body.radius"
                        :stroke-color="item.$map.$strokeColor"
                        :stroke-opacity="1"
                        stroke-style="dashed"
                        :fillColor="item.$map.$fillColor"
                        :stroke-weight="2"
                        @dblclick="dblclick(item)"
                        @mouseover="mouseover($event, item)"
                        @mouseout="mouseout(item)"
                    ></bm-circle>
                </template>
                <template v-else>
                    <bm-polygon
                        :meta="item"
                        stroke-style="dashed"
                        :key="index"
                        :path="item.body"
                        :fillColor="item.$map.$fillColor"
                        :stroke-color="item.$map.$strokeColor"
                        :stroke-opacity="1"
                        :stroke-weight="2"
                        :editing="false"
                        @dblclick="dblclick(item)"
                        @mouseover="mouseover($event, item)"
                        @mouseout="mouseout(item)"
                    >
                    </bm-polygon>
                </template>
            </template>
        </template>
        <template v-else>
            <!-- 二级网格 -->
            <template v-for="(item, index) in paths">
                <template v-if="item.type === 'circle'">
                    <bm-circle
                        :key="index"
                        :center="item.body.center"
                        :radius="item.body.radius"
                        :stroke-color="item.$map.$strokeColor"
                        :stroke-opacity="0.5"
                        stroke-style="dashed"
                        :stroke-weight="2"
                        :fillColor="item.$map.$fillColor"
                        @mouseover="mouseover($event, item)"
                        @mouseout="mouseout(item)"
                    ></bm-circle>
                </template>
                <template v-else>
                    <bm-polygon
                        stroke-style="dashed"
                        :key="index"
                        :path="item.body"
                        :stroke-color="item.$map.$strokeColor"
                        :stroke-opacity="0.5"
                        :stroke-weight="2"
                        :editing="false"
                        :fillColor="item.$map.$fillColor"
                        @mouseover="mouseover($event, item)"
                        @mouseout="mouseout(item)"
                    >
                    </bm-polygon>
                </template>
            </template>
        </template>
    </bm-control>
</template>

<script>
export default {
    props: {
        hoverFillColor: {
            type: String,
            default: 'green',
        },
        level: {
            type: Number,
            default: 1,
        },
        paths: {
            type: Array,
            default() {
                return []
            },
        },
        editing: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {},
    methods: {
        mouseout(item) {
            const { $map } = item
            $map.$fillColor = $map.fillColor
            this.$emit('mouseout')
        },
        mouseover($event, model) {
            const { point } = $event
            const { type, body, $map } = model
            if (this.hoverFillColor) {
                $map.$fillColor = this.hoverFillColor
            }

            this.$emit('mouseover', {
                model,
                position: {
                    ...point,
                },
            })
        },
        dblclick(item) {
            this.$emit('dblclick', item)
        },
    },
}
</script>
