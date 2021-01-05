<template>
    <div class="sg-page Index app-wrapper">
        <section class="app-navbar">
            <div class="app-container">
                <div class="app-title">金融综合服务平台</div>
                <div class="app-menu"></div>
                <div class="app-user">
                    用户信息
                </div>
            </div>
        </section>

        <section class="sidebar-container app-sidebar">
            <sidebar></sidebar>
        </section>

        <!-- 右侧区域 -->
        <section class="main-container">
            <section class="app-main">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive">3</router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </section>
        </section>
    </div>
</template>

<script>
import { Sidebar } from './components'
export default {
    name: 'Index',
    components: { Sidebar },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style lang="less">
.Index {
}

.app-wrapper {
    .app-navbar {
        height: 60px;
        background-color: #158dff;
        position: relative;
        z-index: 101;
        color: #fff;
        .app-container {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 20px;
        }
        .app-title {
            font-size: 23px;
            font-weight: bold;
        }
        .app-menu {
            flex: 1;
        }
        .app-user {
        }
    }
    .app-sidebar {
        -webkit-transition: width 0.28s;
        transition: width 0.28s;
        width: 210px;
        background-color: #253f69;
        height: 100%;
        position: fixed;
        padding-top: 60px;
        top: 0px;
        bottom: 0;
        left: 0;
        z-index: 100;
        overflow: hidden;
        color: #fff;

        .el-menu {
            border-right: none;

            .el-submenu.is-active > .el-submenu__title {
                background-color: #158dff !important;
                color: #fff !important;
            }
            .el-submenu__title i {
                color: #fff !important;
            }
        }
    }
    .main-container {
        height: calc(100% - 60px);
        -webkit-transition: margin-left 0.28s;
        transition: margin-left 0.28s;
        margin-left: 210px;
        position: relative;
        overflow-y: auto;
        background-color: #f0f2f5;
        padding: 20px;
    }
    .app-main {
        background-color: #fff;
        overflow: hidden;
        padding: 20px;
    }
}
</style>
