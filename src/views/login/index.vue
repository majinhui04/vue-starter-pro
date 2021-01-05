<template>
    <div class="sg-page Login">
        <nav class="navbar"></nav>
        <div class="main-container">
            <div class="login-form sg-flexbox">
                <div class="login-form-left">
                    <div class="login-form-title">金融平台后台管理系统</div>
                    <div class="login-form-cover">
                        <img
                            src="https://www.fanruan.com/images/active-bg-fr.png"
                            alt=""
                            width="90%"
                        />
                    </div>
                </div>
                <div class="login-form-right">
                    <sg-data-form
                        class="my-login-form"
                        :fields="LoginView.fields"
                        v-model="LoginView.model"
                        :rules="LoginView.rules"
                        :span="24"
                        :gutter="0"
                        ref="myForm3"
                        :isFieldInline="false"
                        @submit="onSubmit"
                        @reset="onReset"
                    >
                        <div class="header" slot="header">
                            <span>登录</span>
                            <input
                                type="text"
                                name="name"
                                autocomplete="off"
                                class="my-hidden"
                            />
                            <input
                                type="password"
                                name="pwd"
                                autocomplete="off"
                                class="my-hidden"
                            />
                        </div>
                        <i
                            slot="loginNamePrefix"
                            class="el-input__icon el-icon-date"
                        >
                        </i>
                        <i
                            slot="passwordPrefix"
                            class="el-input__icon el-icon-date"
                        >
                        </i>
                        <i
                            slot="codePrefix"
                            class="el-input__icon el-icon-date"
                        >
                        </i>
                        <div slot="codeSlot" class="my-code">
                            <el-button>获取验证码</el-button>
                        </div>

                        <div slot="footer">
                            <el-button
                                type="primary"
                                class="my-login-form-submit"
                                size="large"
                                >登录</el-button
                            >
                        </div>
                    </sg-data-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    components: {},
    data() {
        return {
            LoginView: {
                model: {
                    resource: '',
                    rate: 4,
                    xxx: '不能改',
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入活动名称',
                            trigger: 'blur',
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur',
                        },
                    ],
                    region: [
                        {
                            required: true,
                            message: '请选择活动区域',
                            trigger: 'change',
                        },
                    ],

                    type: [
                        {
                            type: 'array',
                            required: true,
                            message: '请至少选择一个活动性质',
                            trigger: 'blur',
                        },
                    ],
                    resource: [
                        {
                            required: true,
                            message: '请选择活动资源',
                            trigger: 'change',
                        },
                    ],
                    desc: [
                        {
                            required: true,
                            message: '请填写活动形式',
                            trigger: 'blur',
                        },
                    ],
                },

                fields: [
                    {
                        fieldType: 'input',
                        name: 'loginName',
                        label: '',
                        placeholder: '请输入账号',
                        slotType: 'prefix',
                        slotName: 'loginNamePrefix',
                        class: 'my-form-item',
                    },
                    {
                        fieldType: 'input',
                        type: 'password',
                        name: 'pwd',
                        label: '',
                        placeholder: '请输入密码',
                        slotType: 'prefix',
                        slotName: 'passwordPrefix',
                        class: 'my-form-item',
                    },
                    {
                        fieldType: 'input',
                        name: 'code',
                        label: '',
                        placeholder: '请输入验证码',
                        slotType: 'prefix',
                        slotName: 'codePrefix',
                        appendSlot: 'codeSlot',
                        class: 'my-form-item my-form-item-code',
                    },
                ],
            },
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style lang="less">
.my-login-page {
    background-color: #dce9f5;
}
.Login {
    .my-hidden {
        position: fixed;
        left: -99999px;
        top: -99999px;
    }
    .navbar {
        min-height: 50px;
        // margin-bottom: 20px;
    }
    .main-container {
        width: 800px;
        margin: 0 auto;
    }
    .login-form {
        background-color: #fff;
        .login-form-left {
            height: 450px;
            width: 48%;
            background: url('https://www.fanruan.com/images/active-bg.png')
                no-repeat center center;
            background-size: cover;
            color: #fff;

            .login-form-title {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                padding-top: 50px;
            }
            .login-form-cover {
                padding-top: 40px;
                text-align: center;
            }
        }
        .login-form-right {
            flex: 1;
            padding: 30px;
            padding-top: 80px;
        }
        .my-login-form {
            .header {
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 30px;
            }
            .my-form-item-code {
                display: flex;
                align-items: center;

                .my-code {
                    margin-left: 10px;
                }
            }
            .my-login-form-submit {
                width: 240px;
            }
        }
    }
}
</style>
