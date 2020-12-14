<template>
    <div class="Login">
        <div>
            ssid
            <input type="text" v-model="ssid" />
        </div>
        <div>
            用户名
            <input type="text" v-model="username" />
        </div>
        <div>
            密码
            <input type="text" v-model="password" />
        </div>
        <div>
            <input type="text" v-model="checkCode" />
        </div>
        <img
            class="code-img js-checkcode"
            src="http://192.168.2.28:8188/captcha1?t=0.38495161061384375"
            alt=""
        />
        <div>
            <button @click="login">logon</button>
        </div>
    </div>
</template>

<script>
import JSEncrypt from '@/libs/jsencrypt.min.js'
import axios from 'axios'
const jsentrypt = new JSEncrypt()

export default {
    name: 'Login',
    components: {},
    data() {
        return {
            ssid: '4f9922c6-6b21-4352-a17f-7e3321c13b32',
            checkCode: '',
            username: 'admin123',
            password: '123456',
        }
    },
    computed: {},
    watch: {},
    created() {
        this.$http.get('/', {}).then(data => {
            console.log(111, data)
        })
        // jsentrypt.setPublicKey(data)
        // console.log(JSEncrypt)
        // const pwd = jsentrypt.encrypt('123456')
    },
    mounted() {
        console.log(this.$api, this.$http)
    },
    methods: {
        login() {
            var formParam = {
                ssid: this.ssid,
                checkCode: this.checkCode,
                username: this.username,
                password: this.password,
            }
            this.$http
                .get('/rsakey/public', {})
                .then(data => {
                    var jsentrypt = new JSEncrypt()
                    jsentrypt.setPublicKey(data)
                    formParam.password = jsentrypt.encrypt(
                        formParam['password'],
                    )
                    this.$http
                        .post('/admin/login', formParam, {
                            // headers: {
                            //     'Content-Type':
                            //         'application/x-www-form-urlencoded',
                            // },
                        })
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => {
                            console.error(err)
                        })
                })
                .catch(err => {
                    console.error(err)
                })
        },
    },
}
</script>

<style lang="less">
.Login {
}
</style>
