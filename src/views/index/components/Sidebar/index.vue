<template>
    <div :class="{ 'has-logo': showLogo }">
        <div class="sidebar-fold-wrapper" @click="toggleSideBar">
            <i class="el-icon-s-fold" v-if="!isCollapse"></i>
            <i class="el-icon-s-unfold" v-else></i>
        </div>

        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="'#1C2F4D'"
                :text-color="'#bfcbd9'"
                :unique-opened="false"
                :active-text-color="'409EFF'"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="route in permission_menus"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
// import variables from '@/styles/variables.scss'

export default {
    components: { SidebarItem, Logo },
    data() {
        return {
            menus: [
                {
                    path: '/dashboard',
                    meta: {
                        title: '控制面板',
                        icon: 'example1',
                    },
                },
                {
                    path: '/demo',
                    meta: {
                        title: '测试',
                        icon: 'el-icon-date',
                    },
                    children: [
                        {
                            path: '/demo/form',
                            meta: {
                                title: '表单',
                            },
                        },
                        {
                            path: '/demo/table',
                            meta: {
                                title: '表格',
                            },
                        },
                    ],
                },
            ],
        }
    },
    computed: {
        ...mapGetters(['permission_menus', 'sidebar']),
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo
        },
        variables() {
            return variables
        },
        isCollapse() {
            return !this.sidebar.opened
        },
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
    },
}
</script>
