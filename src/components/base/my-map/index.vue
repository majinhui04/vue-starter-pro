<template>
    <div>
        <component :is="name" v-bind="$attrs" @success="onSuccess"></component>
    </div>
</template>

<script>
// 文档  http://api.map.baidu.com/library/DrawingManager/1.4/docs/symbols/BMapLib.DrawingManager.html

import mapEdit from './map-edit'
import mapGrid from './map-grid'
import mapQuery from './map-query'
import mapMarker from './map-marker'
import mapStat from './map-stat'
import mapCompany from './map-company'
export default {
    name: 'MyMap',
    components: {
        mapEdit,
        mapGrid,
        mapMarker,
        mapQuery,
        mapStat,
        mapCompany,
    },
    props: {
        name: {
            type: String,
            default: 'mapEdit',
        },
    },

    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {
        onSuccess(val) {
            this.$emit('success', val)
        },
    },
}
</script>

<style lang="less">
// map
.baidu-map-wrap {
    .bm-view {
        width: 100%;
        height: 100%;
    }

    .icon-btn {
        cursor: pointer;
        width: 44px;
        height: 44px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 7px;
        &.active {
            background: blue;

            .icon {
                color: #fff;
            }
        }
        .icon {
            width: 36px;
            height: 36px;
            color: blue;
        }
    }
    .header {
        height: 60px;
        background-color: rgba(0, 0, 0, 0.31);
        background: rgba(243, 243, 243, 1);
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 15px;
        justify-content: space-between;
        .menu {
            margin-left: 15px;
        }
    }
}
.baidu-map-view {
    position: relative;
    overflow: hidden;
}
.baidu-map-view,
.baidu-map-container {
    width: 100%;
    height: 550px;
    margin: 0;
    overflow: hidden;
}
.sample {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.5);

    overflow: auto;
    color: #fff;
    text-align: left;
    padding: 10px;
    position: absolute;
}
.map-pane-content {
    p {
        line-height: 24px;
        margin: 0;
        font-size: 12px;
    }
}
</style>
