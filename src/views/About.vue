<!-- 说明 -->
<!-- @author 作者 -->

<template>
    <div>
        <h1>This is an about page</h1>
        <p v-for="(item, index) in routes" :key="index">
            <router-link :to="item.path"
                >{{
                    item.meta && item.meta.title ? item.meta.title : item.name
                }}
                {{ item.path }}</router-link
            >
        </p>
    </div>
</template>
<script>
import routes from '@/router/routes'
export default {
    data() {
        return {
            routes,
        }
    },
    mounted() {
        console.log(22, this.$router.options)
    },
}
</script>
