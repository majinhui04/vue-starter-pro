<template>
    <div class="sg-page Index app-wrapper" :class="classObj">
        <section class="app-navbar">
            <div class="app-container">
                <div class="app-title">金融综合服务平台</div>
                <div class="app-menu"></div>
                <div class="app-user">
                    <i class="el-icon-user"></i>
                    <span>欢迎，</span>
                    <el-dropdown
                        class="avatar-container right-menu-item hover-effect"
                        trigger="click"
                    >
                        <span class="name">丰绅殷德</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                        <el-dropdown-menu slot="dropdown">
                            <router-link to="/profile/index">
                                <el-dropdown-item>
                                    <i class="el-icon-lock"></i>
                                    <span>修改密码</span>
                                </el-dropdown-item>
                            </router-link>
                            <el-dropdown-item divided @click.native="logout">
                                <span style="display:block;">
                                    <i class="el-icon-monitor"></i>
                                    <span>退出系统</span>
                                </span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </section>

        <sidebar class="sidebar-container app-sidebar"></sidebar>

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
import { mapState } from 'vuex'
export default {
    name: 'Index',
    components: { Sidebar },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            sidebar: state => state.app.sidebar,
        }),
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
            }
        },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
        logout() {},
    },
}
</script>

<style lang="less">
.Index {
}
@sideBarWidth: 210px;

#app {
    .main-container {
        height: calc(100% - 60px);
        -webkit-transition: margin-left 0.28s;
        transition: margin-left 0.28s;
        margin-left: @sideBarWidth;
        position: relative;
        overflow-y: auto;
        background-color: #f0f2f5;
        padding: 20px;
    }
    .sidebar-container {
        -webkit-transition: width 0.28s;
        transition: width 0.28s;
        width: @sideBarWidth;
        background-color: rgb(38, 64, 104);
        // height: 100%;
        position: fixed;

        top: 60px;
        bottom: 0;
        left: 0;
        z-index: 100;
        overflow: hidden;
        color: #fff;

        // reset element-ui css
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out,
                0s padding-right ease-in-out;
        }

        .scrollbar-wrapper {
            overflow-x: hidden !important;
        }

        .el-scrollbar__bar.is-vertical {
            right: 0px;
        }

        .el-scrollbar {
            height: calc(100% - 40px);
        }
        .is-horizontal {
            display: none;
        }
        a {
            // display: inline-block;
            width: 100%;
            overflow: hidden;
        }
        .el-menu {
            border: none;
            height: 100%;
            width: 100% !important;
        }
    }
    .hideSidebar {
        .sidebar-container {
            width: 54px !important;
        }

        .main-container {
            margin-left: 54px;
        }
        .submenu-title-noDropdown {
            padding: 0 !important;
            position: relative;

            .el-tooltip {
                padding: 0 !important;

                .svg-icon {
                    margin-left: 20px;
                }

                .sub-el-icon {
                    margin-left: 19px;
                }
            }
        }
        .el-submenu {
            overflow: hidden;

            & > .el-submenu__title {
                padding: 0 !important;

                .svg-icon {
                    margin-left: 20px;
                }

                .sub-el-icon {
                    margin-left: 19px;
                }
                span {
                    height: 0;
                    width: 0;
                    overflow: hidden;
                    visibility: hidden;
                    display: inline-block;
                }
                .el-submenu__icon-arrow {
                    display: none;
                }
            }
        }
    }
    .el-scrollbar__wrap {
        overflow-y: auto;
    }
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
            .name {
                line-height: 60px;
                color: #fff;
                margin-right: 7px;
                cursor: pointer;
            }
            .el-icon--right {
                color: #fff;
            }
        }
    }
    .app-sidebar {
        .el-menu {
            border-right: none;

            .el-submenu.is-active > .el-submenu__title,
            .el-menu-item.is-active {
                background-color: #158dff !important;
                color: #fff !important;
            }
            .el-submenu__title i {
                color: #fff !important;
            }

            .el-submenu.is-active .el-menu-item.is-active {
                background-color: transparent !important;
                color: #fff !important;
            }
            .el-submenu .el-menu-item:before {
                content: ' ';
                display: inline-block;
                width: 2px;
                height: 12px;
                background-color: transparent;
                vertical-align: middle;
                margin-right: 15px;
                line-height: 1;
            }
            .el-submenu.is-active .el-menu-item.is-active:before {
                background-color: #158dff;
            }

            .sub-el-icon,
            .sub-svg-icon {
                margin-right: 15px;
                font-size: 14px;
                text-align: center;
                vertical-align: middle;
            }
        }

        .sidebar-fold-wrapper {
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
        }
    }

    .app-main {
        background-color: #fff;
        overflow: hidden;
        padding: 20px;
    }
}
</style>
