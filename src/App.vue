<template>
    <div id="app">
        <router-view></router-view>
    </div>

</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'App',
    data() {
        return {
          
        };
    },
    computed: {
        ...mapState({
            views: state => {
                return state.router.views || [];
            }
        })
    },
    // computed: {
    //     // 动态设置过渡样式
    //     direction: function () {
    //         const currentPath = this.$route.path;
    //         const localRoute = (window.myVue && window.myVue.localRoute) || [];
    //         // console.log(localRoute, currentPath);
    //         const index = localRoute.indexOf(currentPath);
    //         let tranName = '';
    //
    //         if (localRoute.length === 0) {
    //             tranName = 'fade'; // 首页，渐显
    //         } else if (index >= 0) {
    //             tranName = 'page-back'; // 回退，右划
    //         } else {
    //             tranName = 'page-go'; // 进入新页面，左划
    //         }
    //         return tranName;
    //     }
    // },
    watch: {
        $route(to, from) {
            console.log(
                '欢迎访问...',
                from.name,
                this.$route.name,
                this.$route.meta.keepAlive
            );
        }
    },
    created() {
       
       
    },
    methods: {}
};
<style lang="less">

</style>
