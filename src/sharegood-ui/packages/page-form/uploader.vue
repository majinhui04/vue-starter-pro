<template>
    <el-form-item :label="label" :prop="name">
        <el-upload
            class="sg-upload"
            ref="uploader"
            :file-list="currentValue"
            v-bind="exAttrs"
        >
            <slot>
                <el-button slot="trigger" type="primary">选取文件</el-button>
            </slot>

            <div slot="tip" class="el-upload__tip" v-if="exAttrs">
                {{ exAttrs.tip }}
            </div>
        </el-upload>
    </el-form-item>
</template>

<script>
import formMixins from './form-model'

export default {
    name: 'MyUploader',
    props: {
        name: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        accept: {
            type: String,
            default:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        value: {
            type: Array,
            default() {
                return []
            },
        },
    },
    mixins: [formMixins],
    computed: {
        exAttrs() {
            const globalConfig = this.$ShareGood || {}
            const config = globalConfig.uploader || {}
            const attrs = this.$attrs || {}
            let { action, ...rest } = attrs
            action = process.env.VUE_APP_BASEURL_API + action
            const defaults = {
                'auto-upload': false,
                'on-success': this.onSuccess,
                'on-remove': this.onRemove,
                'on-preview': this.onPreview,
            }
            const result = {
                ...defaults,
                ...config,
                ...rest,
                action,
            }
            console.log(1, action)
            return result
        },
    },
    data() {
        return {
            // fileList: [
            //     {
            //         name: 'food.jpeg',
            //         url:
            //             'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            //     },
            //     {
            //         name: 'food2.jpeg',
            //         url:
            //             'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            //     },
            // ],
            currentValue: this.value,
        }
    },
    methods: {
        onSuccess(response, file, fileList) {
            let result = []
            console.log('onSuccess', response, file, fileList)
            this.$emit('input', this.name, result)
        },
        submit() {
            this.$refs.uploader.submit()
        },
        onRemove(file, fileList) {
            console.log(file, fileList)
        },
        onPreview(file) {
            console.log(file)
        },
    },
    mounted() {
        this.$refs['upload']
    },
}
</script>
