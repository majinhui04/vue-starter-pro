<template>
    <div id="app">
        <div>
            {{ message }}
        </div>
        <p :class="$style.red">
            This should be red
        </p>
        <div>
            <ul>
                <li v-for="item in entry" :key="item">
                    <a :href="item">{{ item }}</a>
                </li>
            </ul>
        </div>
        <span :class="$style.c1">颜色</span>
        <el-button>按钮</el-button>
        <el-button class="inputBtn" round>去认证</el-button>
        <page-title></page-title>
    </div>
</template>
<script>
let requireCtx = {}
try {
    requireCtx = require.context(
        '../../entry/',
        true, // 不解析子文件夹
        /main\.js$/,
    )
} catch (err) {
    console.error(err)
}
console.log('requireCtx', requireCtx.keys())
export default {
    data() {
        return {
            entry: [],
            message: '',
        }
    },
    created() {
        this.entry = requireCtx.keys().map(item => {
            return item.replace('/main.js', '.html')
        })
        this.$http.get('/cus/grid/edit')
        this.$api
            .getNewsList({ name: '啊啊' })
            .then(res => {
                this.message = JSON.stringify(res)
                console.log(res)
            })
            .catch(err => {
                this.message = JSON.stringify(err)
                console.error(err)
            })
    },
}
</script>
<style lang="less" module>
.c1 {
    color: @colorPrimary;
}
.red {
    color: red;
}
</style>
